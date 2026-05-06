"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const LOGO_URL =
  "https://cdn.discordapp.com/attachments/1420855366685692094/1501312679837564999/Captura_de_ecra_2026-05-05_205927-Photoroom.png?ex=69fb9de3&is=69fa4c63&hm=05f58669eb1e429ddf818b12f5c5a2031ede04ea6fa309c4fa441b1036dba29e&";

interface Marcacao {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  hora: string;
  mensagem?: string;
  criadoEm: string;
}

type View = "login" | "dashboard";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-PT", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminPage() {
  const [view, setView] = useState<View>("login");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterData, setFilterData] = useState("");

  const fetchMarcacoes = useCallback(async () => {
    setLoadingData(true);
    setDataError("");
    try {
      const res = await fetch("/api/marcacoes");
      if (res.status === 401) { setView("login"); return; }
      if (!res.ok) throw new Error("Erro ao carregar marcações.");
      setMarcacoes(await res.json());
    } catch (err) {
      setDataError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (view === "dashboard") fetchMarcacoes();
  }, [view, fetchMarcacoes]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Palavra-passe incorreta.");
      }
      setPassword("");
      setView("dashboard");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Erro.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setMarcacoes([]);
    setView("login");
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem a certeza que quer eliminar esta marcação?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/marcacoes?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao eliminar.");
      setMarcacoes((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao eliminar.");
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = filterData ? marcacoes.filter((m) => m.data === filterData) : marcacoes;
  const sorted = [...filtered].sort((a, b) =>
    a.data !== b.data ? a.data.localeCompare(b.data) : a.hora.localeCompare(b.hora)
  );

  /* ── LOGIN ── */
  if (view === "login") {
    return (
      <main className="min-h-screen bg-ink flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Image src={LOGO_URL} alt="East Coast Barberia" width={200} height={80} className="mx-auto mb-6 h-20 w-auto object-contain" priority />
            <p className="font-accent text-gold-400 text-xs tracking-wide mb-1">— Acesso restrito —</p>
            <h1 className="font-heading text-3xl tracking-stamp text-cream-200">Área Administrativa</h1>
          </div>

          <form onSubmit={handleLogin} className="bg-dark-700 border border-dark-500 p-8 space-y-5 border-vintage">
            <div>
              <label className="block font-ui font-semibold text-[10px] uppercase tracking-stamp text-cream-400 mb-2">
                Palavra-passe
              </label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" autoFocus
                className="w-full bg-dark-800 border border-dark-400 focus:border-gold-400 text-cream-200 px-4 py-3 text-sm outline-none transition-colors font-sans"
              />
            </div>
            {loginError && (
              <div className="bg-razor-500/10 border border-razor-500/30 text-red-300 px-4 py-3 text-sm font-sans">
                {loginError}
              </div>
            )}
            <button
              type="submit" disabled={loginLoading}
              className="w-full bg-razor-500 hover:bg-razor-400 disabled:opacity-50 text-cream-100 font-ui font-bold py-3 tracking-stamp uppercase text-sm transition-colors"
            >
              {loginLoading ? "A entrar..." : "Entrar"}
            </button>
          </form>

          <p className="text-center mt-6">
            <a href="/" className="font-sans text-dark-400 hover:text-cream-400 text-xs transition-colors">
              ← Voltar ao site
            </a>
          </p>
        </div>
      </main>
    );
  }

  /* ── DASHBOARD ── */
  return (
    <main className="min-h-screen bg-ink">
      <div className="h-0.5 bg-razor-500" />
      <header className="bg-dark-800 border-b border-dark-600 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Image src={LOGO_URL} alt="East Coast Barberia" width={120} height={40} className="h-10 w-auto object-contain opacity-90" />
          <button onClick={handleLogout} className="font-ui font-semibold text-cream-400 hover:text-razor-400 text-[10px] tracking-stamp uppercase transition-colors">
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Marcações", valor: marcacoes.length, red: true },
            { label: "Hoje", valor: marcacoes.filter((m) => m.data === new Date().toISOString().split("T")[0]).length, red: false },
            {
              label: "Esta Semana", red: false,
              valor: marcacoes.filter((m) => {
                const d = new Date(m.data), now = new Date();
                const ws = new Date(now); ws.setDate(now.getDate() - now.getDay() + 1); ws.setHours(0,0,0,0);
                const we = new Date(ws); we.setDate(ws.getDate() + 6);
                return d >= ws && d <= we;
              }).length,
            },
            {
              label: "Este Mês", red: false,
              valor: marcacoes.filter((m) => {
                const now = new Date();
                return m.data.startsWith(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);
              }).length,
            },
          ].map((s) => (
            <div key={s.label} className="bg-dark-700 border border-dark-500 p-5 text-center border-vintage">
              <p className={`font-heading text-4xl ${s.red ? "text-razor-500" : "text-gold-400"}`}>{s.valor}</p>
              <p className="font-ui text-cream-400 text-[10px] mt-2 uppercase tracking-stamp">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <h2 className="font-heading text-cream-200 text-3xl tracking-stamp">Marcações</h2>
          <div className="flex items-center gap-3">
            <label className="font-ui font-semibold text-[10px] text-cream-400 uppercase tracking-stamp">Filtrar:</label>
            <input
              type="date" value={filterData} onChange={(e) => setFilterData(e.target.value)}
              className="bg-dark-700 border border-dark-400 focus:border-gold-400 text-cream-200 px-3 py-2 text-sm outline-none transition-colors font-sans"
            />
            {filterData && (
              <button onClick={() => setFilterData("")} className="font-ui font-semibold text-cream-400 hover:text-cream-200 text-[10px] uppercase tracking-stamp">
                Limpar
              </button>
            )}
            <button
              onClick={fetchMarcacoes}
              className="bg-dark-600 hover:bg-dark-500 text-cream-300 px-4 py-2 font-ui font-semibold text-[10px] uppercase tracking-stamp transition-colors border border-dark-400"
            >
              Atualizar
            </button>
          </div>
        </div>

        {loadingData && <div className="text-center py-16 font-sans text-cream-400">A carregar marcações...</div>}
        {dataError && <div className="bg-razor-500/10 border border-razor-500/30 text-red-300 px-4 py-3 text-sm font-sans mb-4">{dataError}</div>}
        {!loadingData && !dataError && sorted.length === 0 && (
          <div className="text-center py-16 font-sans text-cream-400">
            {filterData ? "Nenhuma marcação para esta data." : "Ainda não há marcações."}
          </div>
        )}

        {!loadingData && sorted.length > 0 && (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto border border-dark-500">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-700 border-b border-dark-500">
                    {["Cliente","Telefone","Serviço","Data","Hora","Marcado em","Obs.",""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-ui font-semibold text-[10px] uppercase tracking-stamp text-cream-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-600">
                  {sorted.map((m) => (
                    <tr key={m.id} className="hover:bg-dark-700/40 transition-colors">
                      <td className="px-4 py-3 font-heading text-cream-200 text-base tracking-wide">{m.nome}</td>
                      <td className="px-4 py-3 font-sans text-cream-300 text-sm">{m.telefone}</td>
                      <td className="px-4 py-3 font-ui font-semibold text-gold-400 text-xs tracking-wide">{m.servico}</td>
                      <td className="px-4 py-3 font-sans text-cream-200 text-sm">{formatDate(m.data)}</td>
                      <td className="px-4 py-3 font-sans text-cream-200 text-sm font-medium">{m.hora}</td>
                      <td className="px-4 py-3 font-sans text-cream-400 text-xs">{formatDateTime(m.criadoEm)}</td>
                      <td className="px-4 py-3 font-sans text-cream-400 text-xs max-w-[140px] truncate italic">{m.mensagem || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(m.id)} disabled={deletingId === m.id}
                          className="font-ui font-semibold text-razor-400 hover:text-razor-500 disabled:opacity-40 text-[10px] uppercase tracking-stamp transition-colors"
                        >
                          {deletingId === m.id ? "..." : "Eliminar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-4">
              {sorted.map((m) => (
                <div key={m.id} className="bg-dark-700 border border-dark-500 p-5 space-y-3 border-vintage">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading text-cream-200 tracking-stamp text-lg">{m.nome}</p>
                      <p className="font-sans text-cream-400 text-sm">{m.telefone}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(m.id)} disabled={deletingId === m.id}
                      className="font-ui font-semibold text-razor-400 hover:text-razor-500 text-[10px] uppercase tracking-stamp"
                    >
                      {deletingId === m.id ? "..." : "Eliminar"}
                    </button>
                  </div>
                  <p className="font-ui font-semibold text-gold-400 text-xs tracking-wide">{m.servico}</p>
                  <p className="font-sans text-cream-200 text-sm">{formatDate(m.data)} às {m.hora}</p>
                  {m.mensagem && <p className="font-sans text-cream-400 text-xs italic">{m.mensagem}</p>}
                  <p className="font-sans text-dark-400 text-xs">Marcado em {formatDateTime(m.criadoEm)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

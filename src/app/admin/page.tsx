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
  const d = new Date(iso);
  return d.toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
      if (res.status === 401) {
        setView("login");
        return;
      }
      if (!res.ok) throw new Error("Erro ao carregar marcações.");
      const data = await res.json();
      setMarcacoes(data);
    } catch (err) {
      setDataError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (view === "dashboard") {
      fetchMarcacoes();
    }
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

  const filtered = filterData
    ? marcacoes.filter((m) => m.data === filterData)
    : marcacoes;

  const sorted = [...filtered].sort((a, b) => {
    if (a.data !== b.data) return a.data.localeCompare(b.data);
    return a.hora.localeCompare(b.hora);
  });

  if (view === "login") {
    return (
      <main className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Image
              src={LOGO_URL}
              alt="East Coast Barberia"
              width={200}
              height={80}
              className="mx-auto mb-6 h-20 w-auto object-contain"
              priority
            />
            <h1 className="text-2xl font-bold">Área Administrativa</h1>
          </div>

          <form onSubmit={handleLogin} className="bg-dark-700 border border-dark-500 p-8 space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Palavra-passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="w-full bg-dark-800 border border-dark-500 focus:border-gold-500 text-white px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            {loginError && (
              <div className="bg-red-900/30 border border-red-500/40 text-red-300 px-4 py-3 text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-dark-900 font-bold py-3 tracking-widest uppercase text-sm transition-colors"
            >
              {loginLoading ? "A entrar..." : "Entrar"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-xs">
            <a href="/" className="hover:text-gray-300 transition-colors">
              ← Voltar ao site
            </a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-500 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={LOGO_URL}
              alt="East Coast Barberia"
              width={140}
              height={44}
              className="h-11 w-auto object-contain"
            />
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 text-xs uppercase tracking-widest transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Marcações", valor: marcacoes.length },
            {
              label: "Hoje",
              valor: marcacoes.filter(
                (m) => m.data === new Date().toISOString().split("T")[0]
              ).length,
            },
            {
              label: "Esta Semana",
              valor: marcacoes.filter((m) => {
                const d = new Date(m.data);
                const now = new Date();
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay() + 1);
                weekStart.setHours(0, 0, 0, 0);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                return d >= weekStart && d <= weekEnd;
              }).length,
            },
            {
              label: "Este Mês",
              valor: marcacoes.filter((m) => {
                const now = new Date();
                return (
                  m.data.startsWith(
                    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
                  )
                );
              }).length,
            },
          ].map((s) => (
            <div key={s.label} className="bg-dark-700 border border-dark-500 p-5 text-center">
              <p className="text-3xl font-bold text-gold-400">{s.valor}</p>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Marcações</h2>
          <div className="flex items-center gap-3">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mr-2">
                Filtrar por data:
              </label>
              <input
                type="date"
                value={filterData}
                onChange={(e) => setFilterData(e.target.value)}
                className="bg-dark-700 border border-dark-500 focus:border-gold-500 text-white px-3 py-2 text-sm outline-none transition-colors"
              />
            </div>
            {filterData && (
              <button
                onClick={() => setFilterData("")}
                className="text-gray-400 hover:text-white text-xs uppercase tracking-wider"
              >
                Limpar
              </button>
            )}
            <button
              onClick={fetchMarcacoes}
              className="bg-dark-600 hover:bg-dark-500 text-gray-300 px-4 py-2 text-xs uppercase tracking-widest transition-colors border border-dark-500"
            >
              Atualizar
            </button>
          </div>
        </div>

        {/* Table */}
        {loadingData && (
          <div className="text-center py-16 text-gray-400">A carregar marcações...</div>
        )}

        {dataError && (
          <div className="bg-red-900/30 border border-red-500/40 text-red-300 px-4 py-3 text-sm mb-4">
            {dataError}
          </div>
        )}

        {!loadingData && !dataError && sorted.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            {filterData ? "Nenhuma marcação para esta data." : "Ainda não há marcações."}
          </div>
        )}

        {!loadingData && sorted.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-700 text-gray-400 uppercase text-xs tracking-wider">
                    <th className="px-4 py-3 text-left">Cliente</th>
                    <th className="px-4 py-3 text-left">Telefone</th>
                    <th className="px-4 py-3 text-left">Serviço</th>
                    <th className="px-4 py-3 text-left">Data</th>
                    <th className="px-4 py-3 text-left">Hora</th>
                    <th className="px-4 py-3 text-left">Marcado em</th>
                    <th className="px-4 py-3 text-left">Obs.</th>
                    <th className="px-4 py-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-600">
                  {sorted.map((m) => (
                    <tr key={m.id} className="hover:bg-dark-700/50 transition-colors">
                      <td className="px-4 py-3 font-medium">{m.nome}</td>
                      <td className="px-4 py-3 text-gray-300">{m.telefone}</td>
                      <td className="px-4 py-3 text-gold-400 text-xs">{m.servico}</td>
                      <td className="px-4 py-3">{formatDate(m.data)}</td>
                      <td className="px-4 py-3 font-mono">{m.hora}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{formatDateTime(m.criadoEm)}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs max-w-[140px] truncate">
                        {m.mensagem || "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(m.id)}
                          disabled={deletingId === m.id}
                          className="text-red-400 hover:text-red-300 disabled:opacity-40 text-xs uppercase tracking-wider transition-colors"
                        >
                          {deletingId === m.id ? "..." : "Eliminar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {sorted.map((m) => (
                <div key={m.id} className="bg-dark-700 border border-dark-500 p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{m.nome}</p>
                      <p className="text-gray-400 text-sm">{m.telefone}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(m.id)}
                      disabled={deletingId === m.id}
                      className="text-red-400 hover:text-red-300 text-xs uppercase tracking-wider"
                    >
                      {deletingId === m.id ? "..." : "Eliminar"}
                    </button>
                  </div>
                  <p className="text-gold-400 text-xs">{m.servico}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white font-mono">
                      {formatDate(m.data)} às {m.hora}
                    </span>
                  </div>
                  {m.mensagem && (
                    <p className="text-gray-400 text-xs italic">{m.mensagem}</p>
                  )}
                  <p className="text-gray-600 text-xs">Marcado em {formatDateTime(m.criadoEm)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICOS = [
  "Corte de Cabelo — 15€",
  "Barba — 12€",
  "Corte + Barba — 22€",
  "Lavagem + Corte — 18€",
  "Hidratação de Barba — 8€",
  "Pacote Premium — 35€",
];

const HORAS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
];

type Status = "idle" | "loading" | "success" | "error";

export default function MarcacoesPage() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    servico: "",
    data: "",
    hora: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function isSunday(dateStr: string) {
    if (!dateStr) return false;
    return new Date(`${dateStr}T12:00:00`).getDay() === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (isSunday(form.data)) {
      setStatus("error");
      setErrorMsg("Aos domingos estamos fechados. Por favor escolha outro dia.");
      return;
    }

    try {
      const res = await fetch("/api/marcacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erro ao submeter marcação.");
      }

      setStatus("success");
      setForm({ nome: "", telefone: "", servico: "", data: "", hora: "", mensagem: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro desconhecido.");
    }
  }

  if (status === "success") {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-dark-900 flex items-center justify-center px-4 pt-16">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Marcação Confirmada!</h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              A sua marcação foi registada com sucesso. Entraremos em contacto para confirmação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setStatus("idle")}
                className="bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold px-6 py-3 tracking-wider uppercase text-sm transition-colors"
              >
                Nova Marcação
              </button>
              <Link
                href="/"
                className="border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-semibold px-6 py-3 tracking-wider uppercase text-sm text-center transition-colors"
              >
                Voltar ao Início
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-900 pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-3">Reserve o seu lugar</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Marcação Online</h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-dark-700 border border-dark-500 p-8 sm:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="João Silva"
                  className="w-full bg-dark-800 border border-dark-500 focus:border-gold-500 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="telefone"
                  required
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="+351 9XX XXX XXX"
                  className="w-full bg-dark-800 border border-dark-500 focus:border-gold-500 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Serviço *
              </label>
              <select
                name="servico"
                required
                value={form.servico}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-500 focus:border-gold-500 text-white px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>Selecionar serviço...</option>
                {SERVICOS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  name="data"
                  required
                  min={today}
                  value={form.data}
                  onChange={handleChange}
                  className={`w-full bg-dark-800 border focus:border-gold-500 text-white px-4 py-3 text-sm outline-none transition-colors ${
                    isSunday(form.data) ? "border-red-500" : "border-dark-500"
                  }`}
                />
                {isSunday(form.data) && (
                  <p className="text-red-400 text-xs mt-1">Fechado aos domingos.</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Hora *
                </label>
                <select
                  name="hora"
                  required
                  value={form.hora}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-500 focus:border-gold-500 text-white px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Selecionar hora...</option>
                  {HORAS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Observações (opcional)
              </label>
              <textarea
                name="mensagem"
                rows={3}
                value={form.mensagem}
                onChange={handleChange}
                placeholder="Alguma indicação especial ou pedido..."
                className="w-full bg-dark-800 border border-dark-500 focus:border-gold-500 text-white px-4 py-3 text-sm outline-none transition-colors resize-none placeholder-gray-600"
              />
            </div>

            {status === "error" && (
              <div className="bg-red-900/30 border border-red-500/40 text-red-300 px-4 py-3 text-sm">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-dark-900 font-bold py-4 tracking-widest uppercase text-sm transition-all duration-200"
            >
              {status === "loading" ? "A processar..." : "Confirmar Marcação"}
            </button>

            <p className="text-gray-500 text-xs text-center">
              Entraremos em contacto para confirmar a disponibilidade.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

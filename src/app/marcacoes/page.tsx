"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICOS = [
  "Corte Simples — €17,00",
  "Corte + Styling — €18,00",
  "Corte Degradê — €19,00",
  "Risco — €1,50",
  "Desenho — €10,00",
  "Barba — €12,50",
];

const HORAS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
  "18:00","18:30","19:00","19:30",
];

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full bg-dark-800 border border-dark-400 focus:border-gold-400 text-cream-200 px-4 py-3 text-sm outline-none transition-colors font-sans placeholder-dark-400";
const labelBase =
  "block font-ui font-semibold text-[10px] uppercase tracking-stamp text-cream-400 mb-2";

export default function MarcacoesPage() {
  const [form, setForm] = useState({
    nome: "", telefone: "", servico: "", data: "", hora: "", mensagem: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function isSunday(dateStr: string) {
    if (!dateStr) return false;
    return new Date(`${dateStr}T12:00:00`).getDay() === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
        <main className="min-h-screen bg-ink flex items-center justify-center px-4 pt-16">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 border border-razor-500/50 flex items-center justify-center mx-auto mb-8">
              <span className="font-heading text-razor-500 text-4xl">✓</span>
            </div>
            <p className="font-accent text-gold-400 text-sm tracking-wide mb-3">— Pedido recebido —</p>
            <h1 className="font-heading text-5xl tracking-stamp text-cream-200 mb-4">
              Marcação Confirmada
            </h1>
            <div className="flex items-center gap-3 justify-center mb-8">
              <div className="h-px flex-1 bg-razor-500/30" />
              <span className="font-ui text-razor-500 text-xs">✦</span>
              <div className="h-px flex-1 bg-razor-500/30" />
            </div>
            <p className="font-sans text-cream-400 mb-10 leading-relaxed">
              A sua marcação foi registada com sucesso. Entraremos em contacto para confirmação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setStatus("idle")}
                className="bg-razor-500 hover:bg-razor-400 text-cream-100 font-ui font-bold px-7 py-3 tracking-stamp uppercase text-sm transition-colors"
              >
                Nova Marcação
              </button>
              <Link
                href="/"
                className="border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-ui font-semibold px-7 py-3 tracking-stamp uppercase text-sm text-center transition-colors"
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
      <main className="min-h-screen bg-ink pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-accent text-gold-400 text-sm tracking-wide mb-3">— Reserve o seu lugar —</p>
            <h1 className="font-heading text-6xl tracking-stamp text-cream-200 mb-4">
              Marcação Online
            </h1>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-16 bg-razor-500/40" />
              <span className="font-ui text-razor-500 text-xs">✦</span>
              <div className="h-px w-16 bg-razor-500/40" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-dark-700 border border-dark-500 border-vintage p-8 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelBase}>Nome Completo *</label>
                <input type="text" name="nome" required value={form.nome} onChange={handleChange} placeholder="João Silva" className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Telefone *</label>
                <input type="tel" name="telefone" required value={form.telefone} onChange={handleChange} placeholder="+351 9XX XXX XXX" className={inputBase} />
              </div>
            </div>

            <div>
              <label className={labelBase}>Serviço *</label>
              <select name="servico" required value={form.servico} onChange={handleChange} className={`${inputBase} appearance-none cursor-pointer`}>
                <option value="" disabled>Selecionar serviço...</option>
                {SERVICOS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelBase}>Data *</label>
                <input
                  type="date" name="data" required min={today} value={form.data} onChange={handleChange}
                  className={`${inputBase} ${isSunday(form.data) ? "border-razor-500/70" : ""}`}
                />
                {isSunday(form.data) && (
                  <p className="font-sans text-razor-400 text-xs mt-1.5">Fechado aos domingos.</p>
                )}
              </div>
              <div>
                <label className={labelBase}>Hora *</label>
                <select name="hora" required value={form.hora} onChange={handleChange} className={`${inputBase} appearance-none cursor-pointer`}>
                  <option value="" disabled>Selecionar hora...</option>
                  {HORAS.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelBase}>Observações (opcional)</label>
              <textarea name="mensagem" rows={3} value={form.mensagem} onChange={handleChange} placeholder="Alguma indicação especial..." className={`${inputBase} resize-none`} />
            </div>

            {status === "error" && (
              <div className="bg-razor-500/10 border border-razor-500/30 text-red-300 px-4 py-3 text-sm font-sans">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-razor-500 hover:bg-razor-400 disabled:opacity-50 disabled:cursor-not-allowed text-cream-100 font-ui font-bold py-4 tracking-stamp uppercase text-sm transition-all duration-200"
            >
              {status === "loading" ? "A processar..." : "Confirmar Marcação"}
            </button>

            <p className="font-sans text-dark-400 text-xs text-center">
              Entraremos em contacto para confirmar a disponibilidade.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

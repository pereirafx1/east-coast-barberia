import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";

const LOGO_URL =
  "https://cdn.discordapp.com/attachments/1420855366685692094/1501312679837564999/Captura_de_ecra_2026-05-05_205927-Photoroom.png?ex=69fb9de3&is=69fa4c63&hm=05f58669eb1e429ddf818b12f5c5a2031ede04ea6fa309c4fa441b1036dba29e&";

const servicos = [
  { nome: "Corte Simples",   preco: "€ 17,00" },
  { nome: "Corte + Styling", preco: "€ 18,00" },
  { nome: "Corte Degradê",   preco: "€ 19,00" },
  { nome: "Risco",           preco: "€ 1,50"  },
  { nome: "Desenho",         preco: "€ 10,00" },
  { nome: "Barba",           preco: "€ 12,50" },
];

const galeria = [
  "Corte Clássico",
  "Barba Perfeita",
  "Fade Moderno",
  "Acabamento",
  "Navalha",
  "Estilo Premium",
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-ink overflow-hidden">
        {/* Padrão de fundo subtil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#C9961A 0,#C9961A 1px,transparent 0,transparent 80px),repeating-linear-gradient(90deg,#C9961A 0,#C9961A 1px,transparent 0,transparent 80px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0D0D0D_90%)]" />

        {/* Linhas laterais vermelhas — referência às navalhas cruzadas */}
        <div className="absolute left-6 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-razor-500/40 to-transparent" />
        <div className="absolute right-6 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-razor-500/40 to-transparent" />

        <div className="relative text-center px-4 max-w-3xl mx-auto">
          <Image
            src={LOGO_URL}
            alt="East Coast Barberia"
            width={500}
            height={300}
            className="mx-auto mb-8 w-auto h-52 sm:h-64 lg:h-80 object-contain drop-shadow-[0_0_60px_rgba(155,35,53,0.1)]"
            priority
          />

          <div className="razor-divider mb-8 max-w-sm mx-auto">
            <span className="font-ui text-razor-500 text-xs">✦</span>
          </div>

          <p className="font-sans text-cream-300 text-base sm:text-lg max-w-md mx-auto mb-12 leading-relaxed">
            Cortes de precisão, barbas impecáveis e a experiência que o homem moderno merece.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marcacoes"
              className="bg-razor-500 hover:bg-razor-400 text-cream-100 font-ui font-bold px-10 py-4 tracking-stamp uppercase text-sm transition-all duration-200 hover:scale-105"
            >
              Marcar Agora
            </Link>
            <a
              href="#servicos"
              className="border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 font-ui font-semibold px-10 py-4 tracking-stamp uppercase text-sm transition-all duration-200"
            >
              Ver Serviços
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-ui text-cream-400/40 text-[10px] tracking-widest uppercase">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-cream-400/30 to-transparent" />
        </div>
      </section>

      {/* Serviços — tabela de preços estilo lista */}
      <section id="servicos" className="py-28 px-4 bg-dark-800">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h2 className="font-heading text-6xl sm:text-7xl text-cream-200 tracking-stamp mb-2">
              Tabela de Preços
            </h2>
            <div className="w-10 h-0.5 bg-razor-500" />
          </div>

          <div className="divide-y divide-dark-500">
            {servicos.map((s) => (
              <div
                key={s.nome}
                className="flex items-center justify-between py-5 group"
              >
                <span className="font-ui font-semibold text-cream-200 text-base sm:text-lg tracking-wide group-hover:text-gold-400 transition-colors duration-200">
                  {s.nome}
                </span>
                <span className="font-heading text-cream-200 text-xl sm:text-2xl tracking-stamp ml-6 shrink-0">
                  {s.preco}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/marcacoes"
              className="bg-razor-500 hover:bg-razor-400 text-cream-100 font-ui font-bold px-10 py-4 tracking-stamp uppercase text-sm transition-all duration-200 inline-block"
            >
              Reservar Serviço
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-28 px-4 bg-ink">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-accent text-gold-400 text-sm tracking-wide mb-4">— A nossa história —</p>
            <h2 className="font-heading text-6xl sm:text-7xl text-cream-200 tracking-stamp mb-6">
              Sobre Nós
            </h2>
            <div className="razor-divider mb-8 max-w-[10rem]">
              <span className="font-ui text-razor-500 text-xs">✦</span>
            </div>
            <div className="space-y-4 font-sans text-cream-300 leading-relaxed text-[15px]">
              <p>
                A East Coast Barberia nasceu em 2018 em Setúbal com uma visão clara: criar um espaço
                onde o homem pode relaxar, cuidar da sua imagem e sair a sentir-se o melhor de si mesmo.
              </p>
              <p>
                Os nossos barbeiros são profissionais certificados com anos de experiência em cortes
                clássicos e modernos. Cada cliente é tratado com atenção personalizada, garantindo
                um resultado que supera as expectativas.
              </p>
              <p>
                Usamos exclusivamente produtos premium — desde pomadas a óleos de barba — para garantir
                o melhor acabamento e cuidado para o seu cabelo e pele.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { valor: "6+", label: "Anos de Experiência" },
              { valor: "2k+", label: "Clientes Satisfeitos" },
              { valor: "4", label: "Barbeiros Especializados" },
              { valor: "100%", label: "Produtos Premium" },
            ].map((stat, i) => (
              <div key={stat.label} className={`border p-8 text-center border-vintage ${i % 2 === 0 ? "bg-dark-700 border-dark-500" : "bg-dark-700 border-dark-500"}`}>
                <p className={`font-heading text-5xl mb-3 ${i === 0 ? "text-razor-500" : "text-gold-400"}`}>
                  {stat.valor}
                </p>
                <p className="font-ui text-cream-400 text-[10px] uppercase tracking-stamp leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="py-28 px-4 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="O nosso trabalho" title="Galeria" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galeria.map((label, i) => (
              <div
                key={i}
                className="aspect-square bg-dark-600 border border-dark-400 hover:border-razor-500/40 transition-all duration-300 group relative overflow-hidden flex items-end p-5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-cream-200/5 text-9xl group-hover:text-cream-200/10 transition-all duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative">
                  <p className="font-heading text-cream-200 text-base tracking-stamp">{label}</p>
                  <div className="h-px w-8 bg-razor-500 mt-1 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Marcação — vermelho flanela como fundo */}
      <section className="py-28 px-4 bg-razor-500 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#0D0D0D 0,#0D0D0D 1px,transparent 0,transparent 25px)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="font-accent text-cream-100/60 text-sm tracking-wide mb-4">
            — Sem esperas desnecessárias —
          </p>
          <h2 className="font-heading text-5xl sm:text-7xl text-cream-100 tracking-stamp mb-6">
            Pronto para o próximo corte?
          </h2>
          <div className="razor-divider mb-10 max-w-xs mx-auto">
            <span className="font-ui text-cream-100/30 text-xs">✦</span>
          </div>
          <Link
            href="/marcacoes"
            className="bg-ink hover:bg-dark-800 text-cream-200 font-ui font-bold px-12 py-5 tracking-stamp uppercase text-sm transition-all duration-200 inline-block hover:scale-105 border border-cream-200/10"
          >
            Marcar Agora
          </Link>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-28 px-4 bg-ink">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Encontra-nos" title="Contacto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { num: "01", titulo: "Morada", linhas: ["R. São Filipe 1B", "2900-457 Setúbal"] },
              { num: "02", titulo: "Telefone", linhas: ["910 163 502", "Rede móvel nacional"] },
              { num: "03", titulo: "Horário", linhas: ["Seg – Sáb: 09h – 20h", "Domingo: Fechado"] },
            ].map((card) => (
              <div key={card.titulo} className="bg-dark-700 border border-dark-500 p-8 text-center border-vintage">
                <span className="font-heading text-razor-500/25 text-5xl block mb-3">{card.num}</span>
                <h3 className="font-ui font-semibold text-gold-400 uppercase tracking-stamp text-xs mb-4">
                  {card.titulo}
                </h3>
                {card.linhas.map((l) => (
                  <p key={l} className="font-sans text-cream-300 text-sm leading-relaxed">{l}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Mapa — pesquisa por morada, satélite, filtro escuro */}
          <div className="border border-dark-500 overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=R.+S%C3%A3o+Filipe+1B,+2900-457+Set%C3%BAbal,+Portugal&t=k&z=18&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, filter: "grayscale(1) invert(0.9) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="East Coast Barberia — R. São Filipe 1B, Setúbal"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

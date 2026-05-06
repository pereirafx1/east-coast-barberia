import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";

const LOGO_URL =
  "https://cdn.discordapp.com/attachments/1420855366685692094/1501312679837564999/Captura_de_ecra_2026-05-05_205927-Photoroom.png?ex=69fb9de3&is=69fa4c63&hm=05f58669eb1e429ddf818b12f5c5a2031ede04ea6fa309c4fa441b1036dba29e&";

const servicos = [
  {
    num: "I",
    nome: "Corte de Cabelo",
    preco: "15€",
    duracao: "30 min",
    descricao: "Corte clássico ou moderno com acabamento perfeito.",
  },
  {
    num: "II",
    nome: "Barba",
    preco: "12€",
    duracao: "25 min",
    descricao: "Aparo e definição com navalha para um look impecável.",
  },
  {
    num: "III",
    nome: "Corte + Barba",
    preco: "22€",
    duracao: "50 min",
    descricao: "O combo completo para o homem que cuida da sua imagem.",
  },
  {
    num: "IV",
    nome: "Lavagem + Corte",
    preco: "18€",
    duracao: "45 min",
    descricao: "Lavagem com produtos premium antes do corte.",
  },
  {
    num: "V",
    nome: "Hidratação de Barba",
    preco: "8€",
    duracao: "15 min",
    descricao: "Tratamento nutritivo para barba saudável e macia.",
  },
  {
    num: "VI",
    nome: "Pacote Premium",
    preco: "35€",
    duracao: "75 min",
    descricao: "Lavagem, corte, barba e hidratação — a experiência completa.",
  },
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
        {/* Fundo geométrico vintage */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #C9961A 0, #C9961A 1px, transparent 0, transparent 60px), repeating-linear-gradient(90deg, #C9961A 0, #C9961A 1px, transparent 0, transparent 60px)",
          }}
        />
        {/* Vinheta nos cantos */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#0D0D0D_100%)]" />

        <div className="relative text-center px-4 max-w-3xl mx-auto">
          <Image
            src={LOGO_URL}
            alt="East Coast Barberia"
            width={480}
            height={280}
            className="mx-auto mb-10 w-auto h-48 sm:h-64 lg:h-72 object-contain drop-shadow-[0_0_40px_rgba(201,150,26,0.15)]"
            priority
          />

          <div className="ornament mb-8 max-w-sm mx-auto">
            <span className="text-gold-400 text-xs">◆</span>
          </div>

          <p className="font-sans text-cream-300 text-base sm:text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            Cortes de precisão, barbas impecáveis e a experiência que o homem moderno merece.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marcacoes"
              className="bg-gold-400 hover:bg-gold-300 text-ink font-heading font-bold px-10 py-4 tracking-stamp uppercase text-sm transition-all duration-200 hover:scale-105 border-vintage"
            >
              Marcar Agora
            </Link>
            <a
              href="#servicos"
              className="border border-gold-600 text-gold-400 hover:bg-gold-400/10 font-heading font-medium px-10 py-4 tracking-stamp uppercase text-sm transition-all duration-200"
            >
              Ver Serviços
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-heading text-gold-600 text-[10px] tracking-widest uppercase">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold-600 to-transparent" />
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-28 px-4 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="O que fazemos" title="Serviços" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicos.map((s) => (
              <div
                key={s.nome}
                className="bg-dark-700 border border-dark-500 hover:border-gold-600/60 p-7 group transition-all duration-300 hover:-translate-y-1 border-vintage relative"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-heading text-gold-400/50 text-3xl font-bold leading-none">
                    {s.num}
                  </span>
                  <span className="font-heading text-gold-400 font-bold text-xl tracking-tight">
                    {s.preco}
                  </span>
                </div>
                <h3 className="font-heading text-cream-200 text-xl font-semibold uppercase tracking-wide mb-2">
                  {s.nome}
                </h3>
                <p className="font-sans text-cream-400 text-sm leading-relaxed mb-5">{s.descricao}</p>
                <p className="font-accent italic text-gold-600 text-xs">{s.duracao}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link
              href="/marcacoes"
              className="bg-gold-400 hover:bg-gold-300 text-ink font-heading font-bold px-10 py-4 tracking-stamp uppercase text-sm transition-all duration-200 inline-block border-vintage"
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
            <p className="font-accent italic text-gold-400 text-sm tracking-widest mb-4">
              A nossa história
            </p>
            <h2 className="font-heading text-5xl sm:text-6xl font-bold uppercase tracking-stamp text-cream-200 mb-4">
              Sobre Nós
            </h2>
            <div className="ornament mb-8 max-w-[12rem]">
              <span className="text-gold-400 text-xs">◆</span>
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
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-dark-700 border border-dark-500 p-8 text-center border-vintage"
              >
                <p className="font-heading text-5xl font-bold text-gold-400 mb-3">{stat.valor}</p>
                <p className="font-sans text-cream-400 text-xs uppercase tracking-widest leading-snug">
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
                className="aspect-square bg-dark-600 border border-dark-400 hover:border-gold-600/50 transition-all duration-300 group relative overflow-hidden flex items-end p-5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-gold-400/10 text-8xl font-bold group-hover:text-gold-400/20 transition-all duration-500">
                    {["I","II","III","IV","V","VI"][i]}
                  </span>
                </div>
                <div className="relative">
                  <p className="font-heading text-cream-200 text-sm uppercase tracking-stamp">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Marcação */}
      <section className="py-28 px-4 bg-gold-500 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #0D0D0D 0, #0D0D0D 1px, transparent 0, transparent 30px)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="font-accent italic text-ink/60 text-sm tracking-widest mb-4">
            Sem esperas desnecessárias
          </p>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ink uppercase tracking-stamp mb-6">
            Pronto para o próximo corte?
          </h2>
          <div className="ornament mb-10 max-w-xs mx-auto">
            <span className="text-ink/40 text-xs">◆</span>
          </div>
          <Link
            href="/marcacoes"
            className="bg-ink hover:bg-dark-800 text-cream-200 font-heading font-bold px-12 py-5 tracking-stamp uppercase text-sm transition-all duration-200 inline-block hover:scale-105"
          >
            Marcar Agora
          </Link>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-28 px-4 bg-ink">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Encontra-nos" title="Contacto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: "I",
                titulo: "Morada",
                linhas: ["R. São Filipe 1B", "2900-457 Setúbal"],
              },
              {
                num: "II",
                titulo: "Telefone",
                linhas: ["910 163 502", "Rede móvel nacional"],
              },
              {
                num: "III",
                titulo: "Horário",
                linhas: ["Seg – Sáb: 09h – 20h", "Domingo: Fechado"],
              },
            ].map((card) => (
              <div
                key={card.titulo}
                className="bg-dark-700 border border-dark-500 p-8 text-center border-vintage"
              >
                <span className="font-heading text-gold-400/30 text-4xl font-bold block mb-4">
                  {card.num}
                </span>
                <h3 className="font-heading text-gold-400 uppercase tracking-stamp text-xs font-semibold mb-4">
                  {card.titulo}
                </h3>
                {card.linhas.map((l) => (
                  <p key={l} className="font-sans text-cream-300 text-sm leading-relaxed">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Mapa */}
          <div className="border border-dark-500 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3!2d-8.890!3d38.524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd194f4b7b2b1111%3A0x0!2sR.+S%C3%A3o+Filipe+1B%2C+2900-457+Set%C3%BAbal!5e0!3m2!1spt!2spt!4v1000000000000!5m2!1spt!2spt&q=R.+S%C3%A3o+Filipe+1B,+2900-457+Set%C3%BAbal,+Portugal"
              width="100%"
              height="350"
              style={{ border: 0, filter: "grayscale(1) invert(0.85) hue-rotate(180deg) sepia(0.2)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="East Coast Barberia - Localização"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

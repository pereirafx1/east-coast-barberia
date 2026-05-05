import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const servicos = [
  {
    nome: "Corte de Cabelo",
    preco: "15€",
    duracao: "30 min",
    descricao: "Corte clássico ou moderno com acabamento perfeito.",
    icon: "✂️",
  },
  {
    nome: "Barba",
    preco: "12€",
    duracao: "25 min",
    descricao: "Aparo e definição com navalha para um look impecável.",
    icon: "🪒",
  },
  {
    nome: "Corte + Barba",
    preco: "22€",
    duracao: "50 min",
    descricao: "O combo completo para o homem que cuida da sua imagem.",
    icon: "💈",
  },
  {
    nome: "Lavagem + Corte",
    preco: "18€",
    duracao: "45 min",
    descricao: "Lavagem com produtos premium antes do corte.",
    icon: "🚿",
  },
  {
    nome: "Hidratação de Barba",
    preco: "8€",
    duracao: "15 min",
    descricao: "Tratamento nutritivo para barba saudável e macia.",
    icon: "🧴",
  },
  {
    nome: "Pacote Premium",
    preco: "35€",
    duracao: "75 min",
    descricao: "Lavagem, corte, barba e hidratação — a experiência completa.",
    icon: "👑",
  },
];

const galeria = [
  { bg: "bg-dark-600", label: "Corte Clássico" },
  { bg: "bg-dark-700", label: "Barba Perfeita" },
  { bg: "bg-dark-600", label: "Fade Moderno" },
  { bg: "bg-dark-700", label: "Acabamento" },
  { bg: "bg-dark-600", label: "Navalha" },
  { bg: "bg-dark-700", label: "Estilo Premium" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-dark-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_1px,transparent_0,transparent_50%)] bg-[size:20px_20px]" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent opacity-60" />
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent opacity-60" />

        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-xs sm:text-sm mb-6">
            Setúbal · Desde 2018
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
            EAST COAST
          </h1>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gold-500 tracking-tight mb-8">
            BARBERIA
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-8" />
          <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Cortes de precisão, barbas impecáveis e a experiência que o homem moderno merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marcacoes"
              className="bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold px-8 py-4 tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105"
            >
              Marcar Agora
            </Link>
            <a
              href="#servicos"
              className="border border-gold-500 text-gold-400 hover:bg-gold-500/10 font-semibold px-8 py-4 tracking-widest uppercase text-sm transition-all duration-200"
            >
              Ver Serviços
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gold-500/50 text-xs tracking-widest uppercase">scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 px-4 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-3">O que fazemos</p>
            <h2 className="text-4xl sm:text-5xl font-bold">Serviços</h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((s) => (
              <div
                key={s.nome}
                className="bg-dark-700 border border-dark-500 hover:border-gold-500/50 p-6 group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold">{s.nome}</h3>
                  <span className="text-gold-400 font-bold text-lg">{s.preco}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.descricao}</p>
                <p className="text-gray-500 text-xs tracking-wider uppercase">{s.duracao}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/marcacoes"
              className="bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold px-8 py-4 tracking-widest uppercase text-sm transition-all duration-200 inline-block"
            >
              Reservar Serviço
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 px-4 bg-dark-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-3">A nossa história</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Sobre Nós</h2>
            <div className="w-16 h-0.5 bg-gold-500 mb-8" />
            <div className="space-y-4 text-gray-300 leading-relaxed">
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
                className="bg-dark-700 border border-dark-500 p-8 text-center"
              >
                <p className="text-4xl font-bold text-gold-400 mb-2">{stat.valor}</p>
                <p className="text-gray-400 text-sm leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="py-24 px-4 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-3">O nosso trabalho</p>
            <h2 className="text-4xl sm:text-5xl font-bold">Galeria</h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {galeria.map((item, i) => (
              <div
                key={i}
                className={`${item.bg} aspect-square flex items-end p-4 border border-dark-500 hover:border-gold-500/40 transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-dark-900/80" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                  <span className="text-6xl">💈</span>
                </div>
                <span className="relative text-gray-300 text-xs tracking-wider uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Marcação */}
      <section className="py-24 px-4 bg-gold-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6">
            Pronto para o próximo corte?
          </h2>
          <p className="text-dark-700 text-lg mb-10">
            Reserve a sua marcação online em menos de 2 minutos. Sem esperas desnecessárias.
          </p>
          <Link
            href="/marcacoes"
            className="bg-dark-900 hover:bg-dark-800 text-white font-bold px-10 py-5 tracking-widest uppercase text-sm transition-all duration-200 inline-block hover:scale-105"
          >
            Marcar Agora
          </Link>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 px-4 bg-dark-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-3">Encontra-nos</p>
            <h2 className="text-4xl sm:text-5xl font-bold">Contacto</h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📍",
                titulo: "Morada",
                linhas: ["Rua de Exemplo, 42", "2900-000 Setúbal"],
              },
              {
                icon: "📞",
                titulo: "Telefone",
                linhas: ["+351 265 000 000", "Chamada para rede fixa nacional"],
              },
              {
                icon: "🕐",
                titulo: "Horário",
                linhas: ["Ter – Sex: 09h–19h", "Sáb: 09h–17h · Dom/Seg: Fechado"],
              },
            ].map((card) => (
              <div key={card.titulo} className="bg-dark-700 border border-dark-500 p-8 text-center">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-gold-400 uppercase tracking-widest text-xs font-semibold mb-3">
                  {card.titulo}
                </h3>
                {card.linhas.map((l) => (
                  <p key={l} className="text-gray-300 text-sm">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

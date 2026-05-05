import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-gold-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 border-2 border-gold-500 flex items-center justify-center">
              <span className="text-gold-500 font-bold text-xs">EC</span>
            </div>
            <span className="text-white font-semibold tracking-widest uppercase text-sm">
              East Coast <span className="text-gold-500">Barberia</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Barbearia premium em Setúbal. O lugar onde o estilo encontra a tradição.
          </p>
        </div>

        <div>
          <h4 className="text-gold-400 uppercase tracking-widest text-xs font-semibold mb-4">
            Horário
          </h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="flex justify-between gap-4">
              <span>Terça — Sexta</span>
              <span>09:00 – 19:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Sábado</span>
              <span>09:00 – 17:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Dom / Segunda</span>
              <span className="text-red-400">Fechado</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold-400 uppercase tracking-widest text-xs font-semibold mb-4">
            Contacto
          </h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Rua de Exemplo, 42 · Setúbal</li>
            <li>
              <a href="tel:+351265000000" className="hover:text-gold-400 transition-colors">
                +351 265 000 000
              </a>
            </li>
            <li>
              <a href="mailto:geral@eastcoastbarberia.pt" className="hover:text-gold-400 transition-colors">
                geral@eastcoastbarberia.pt
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-dark-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} East Coast Barberia · Todos os direitos reservados
        </p>
        <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
          Área Admin
        </Link>
      </div>
    </footer>
  );
}

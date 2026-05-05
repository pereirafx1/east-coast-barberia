import Link from "next/link";
import Image from "next/image";

const LOGO_URL =
  "https://cdn.discordapp.com/attachments/1420855366685692094/1501312679837564999/Captura_de_ecra_2026-05-05_205927-Photoroom.png?ex=69fb9de3&is=69fa4c63&hm=05f58669eb1e429ddf818b12f5c5a2031ede04ea6fa309c4fa441b1036dba29e&";

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-gold-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="mb-4">
            <Image
              src={LOGO_URL}
              alt="East Coast Barberia"
              width={140}
              height={48}
              className="h-12 w-auto object-contain"
            />
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
              <span>Segunda — Sábado</span>
              <span>09:00 – 20:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Domingo</span>
              <span className="text-red-400">Fechado</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold-400 uppercase tracking-widest text-xs font-semibold mb-4">
            Contacto
          </h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>R. São Filipe 1B, 2900-457 Setúbal</li>
            <li>
              <a href="tel:+351910163502" className="hover:text-gold-400 transition-colors">
                910 163 502
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

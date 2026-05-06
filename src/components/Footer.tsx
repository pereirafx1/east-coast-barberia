import Link from "next/link";
import Image from "next/image";

const LOGO_URL =
  "https://cdn.discordapp.com/attachments/1420855366685692094/1501312679837564999/Captura_de_ecra_2026-05-05_205927-Photoroom.png?ex=69fb9de3&is=69fa4c63&hm=05f58669eb1e429ddf818b12f5c5a2031ede04ea6fa309c4fa441b1036dba29e&";

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-gold-600/20 py-14 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Image
            src={LOGO_URL}
            alt="East Coast Barberia"
            width={140}
            height={56}
            className="h-14 w-auto object-contain mb-5 opacity-90"
          />
          <p className="font-sans text-cream-400 text-sm leading-relaxed">
            Barbearia premium em Setúbal. O lugar onde o estilo encontra a tradição.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-gold-400 uppercase tracking-stamp text-xs font-semibold mb-5">
            Horário
          </h4>
          <ul className="font-sans text-cream-400 text-sm space-y-2.5">
            <li className="flex justify-between gap-4">
              <span>Segunda — Sábado</span>
              <span className="text-cream-300">09:00 – 20:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Domingo</span>
              <span className="text-red-400/80">Fechado</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-gold-400 uppercase tracking-stamp text-xs font-semibold mb-5">
            Contacto
          </h4>
          <ul className="font-sans text-cream-400 text-sm space-y-2.5">
            <li>R. São Filipe 1B, 2900-457 Setúbal</li>
            <li>
              <a href="tel:+351910163502" className="hover:text-gold-400 transition-colors">
                910 163 502
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-dark-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-dark-400 text-xs tracking-wide">
          © {new Date().getFullYear()} East Coast Barberia · Todos os direitos reservados
        </p>
        <Link href="/admin" className="font-sans text-dark-400 hover:text-cream-400 text-xs transition-colors">
          Área Admin
        </Link>
      </div>
    </footer>
  );
}

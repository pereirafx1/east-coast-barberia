"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const LOGO_URL =
  "https://cdn.discordapp.com/attachments/1420855366685692094/1501312679837564999/Captura_de_ecra_2026-05-05_205927-Photoroom.png?ex=69fb9de3&is=69fa4c63&hm=05f58669eb1e429ddf818b12f5c5a2031ede04ea6fa309c4fa441b1036dba29e&";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#servicos", label: "Serviços" },
    { href: "#sobre", label: "Sobre" },
    { href: "#galeria", label: "Galeria" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-gold-500/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={LOGO_URL}
              alt="East Coast Barberia"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-gray-300 hover:text-gold-400 text-sm tracking-wider uppercase transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/marcacoes"
              className="bg-gold-500 hover:bg-gold-400 text-dark-900 font-semibold text-sm px-5 py-2 tracking-wider uppercase transition-colors duration-200"
            >
              Marcar
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-dark-800 border-t border-gold-500/20 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-gold-400 text-sm tracking-wider uppercase"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/marcacoes"
            onClick={() => setOpen(false)}
            className="bg-gold-500 hover:bg-gold-400 text-dark-900 font-semibold text-sm px-5 py-2 tracking-wider uppercase text-center"
          >
            Marcar Consulta
          </Link>
        </div>
      )}
    </nav>
  );
}

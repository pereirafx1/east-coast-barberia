"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#servicos", label: "Serviços" },
    { href: "#sobre", label: "Sobre" },
    { href: "#galeria", label: "Galeria" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-sm border-b border-gold-600/20">
      {/* Barra vermelha de topo — referência à camisa do logo */}
      <div className="h-0.5 bg-razor-500" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-14 gap-8">
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-ui font-semibold text-cream-300 hover:text-gold-400 text-xs tracking-stamp uppercase transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/marcacoes"
              className="bg-razor-500 hover:bg-razor-400 text-cream-100 font-ui font-bold text-xs px-5 py-2.5 tracking-stamp uppercase transition-colors duration-200"
            >
              Marcar
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-cream-300 p-2"
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-cream-300 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-cream-300 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-cream-300 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-dark-800 border-t border-dark-600 px-4 py-5 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-ui font-semibold text-cream-300 hover:text-gold-400 text-xs tracking-stamp uppercase"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/marcacoes"
            onClick={() => setOpen(false)}
            className="bg-razor-500 hover:bg-razor-400 text-cream-100 font-ui font-bold text-xs px-5 py-3 tracking-stamp uppercase text-center"
          >
            Marcar Consulta
          </Link>
        </div>
      )}
    </nav>
  );
}

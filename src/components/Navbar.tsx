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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-gold-500/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-gold-500 flex items-center justify-center">
              <span className="text-gold-500 font-bold text-xs">EC</span>
            </div>
            <span className="text-white font-semibold tracking-widest uppercase text-sm">
              East Coast <span className="text-gold-500">Barberia</span>
            </span>
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

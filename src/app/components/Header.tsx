"use client";

import Image from "next/image";
import { useState } from "react";

// Categorías del menú.
const CATEGORIAS = [
  { nombre: "Skincare", href: "/#skincare" },
  { nombre: "Maquillaje", href: "/#maquillaje" },
  { nombre: "Capilar", href: "/#capilar" },
  { nombre: "Suplementos", href: "/#suplementos" },
  { nombre: "Ropa y Accesorios", href: "/#ropa" },
];

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="relative w-full border-b border-zinc-100">
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6">
        {/* Izquierda: menú hamburguesa */}
        <button
          type="button"
          onClick={() => setMenuAbierto((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-zinc-100"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        {/* Centro: logo (posición absoluta para crecer sin mover el menú) */}
        <a
          href="/"
          className="absolute left-1/2 top-3 -translate-x-1/2"
          aria-label="KAPRICHO"
        >
          <Image
            src="/imagenes/logo-header.png"
            alt="KAPRICHO"
            width={931}
            height={650}
            priority
            className="h-24 w-auto sm:h-28"
          />
        </a>

        {/* Derecha: espacio para equilibrar el logo centrado */}
        <div className="h-11 w-11" aria-hidden="true" />
      </div>

      {/* Menú: opciones flotando sobre la pantalla oscurecida (sin recuadro) */}
      {menuAbierto && (
        <div className="fixed inset-0 z-50">
          {/* Fondo oscuro que cubre toda la pantalla (clic para cerrar) */}
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuAbierto(false)}
            className="absolute inset-0 cursor-default bg-black/70"
          />

          {/* Opciones flotando a la izquierda, sin recuadro */}
          <nav className="absolute left-0 top-0 flex h-full w-72 max-w-[80%] flex-col gap-1 p-6 pt-8">
            {/* Botón cerrar (X) */}
            <button
              type="button"
              onClick={() => setMenuAbierto(false)}
              aria-label="Cerrar menú"
              className="mb-4 flex h-9 w-9 items-center justify-center self-start rounded-full text-white transition-colors hover:bg-white/10"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {CATEGORIAS.map((cat) => (
              <a
                key={cat.nombre}
                href={cat.href}
                onClick={() => setMenuAbierto(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {cat.nombre}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

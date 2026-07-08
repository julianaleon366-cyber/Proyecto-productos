"use client";

import { useState } from "react";
import { useBolsa } from "../lib/BolsaContext";

// Nombre de la marca.
const NOMBRE_MARCA = "KAPRICHO";

// Categorías del menú desplegable.
const CATEGORIAS = [
  { nombre: "Skincare", href: "/#skincare" },
  { nombre: "Maquillaje", href: "/#maquillaje" },
  { nombre: "Cabello", href: "/#cabello" },
  { nombre: "Moda y Accesorios", href: "/moda" },
];

export default function Header() {
  const [busqueda, setBusqueda] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { totalUnidades } = useBolsa();

  // Provisional: favoritos vendrá del estado real más adelante.
  const totalFavoritos = 0;
  const totalBolsa = totalUnidades;

  function manejarBusqueda(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar con la búsqueda del catálogo.
    console.log("Buscar:", busqueda);
  }

  return (
    <header className="relative w-full border-b border-zinc-100">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
        {/* Izquierda: menú hamburguesa + barra de búsqueda */}
        <div className="flex items-center gap-3 justify-self-start">
          {/* Botón menú (tres rayitas) */}
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

          {/* Barra de búsqueda rectangular negra */}
          <form onSubmit={manejarBusqueda} className="w-full max-w-xs" role="search">
            <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2.5">
              <svg
                className="h-4 w-4 shrink-0 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar productos…"
                aria-label="Buscar productos"
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>
          </form>
        </div>

        {/* Centro: logo */}
        <div className="justify-self-center">
          <a href="/" className="flex items-center gap-2.5" aria-label="KAPRICHO">
            {/* Símbolo: círculo negro con inicial */}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-base font-bold text-white">
              K
            </span>
            {/* Nombre de la marca */}
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              KAPRICHO
            </span>
          </a>
        </div>

        {/* Derecha: favoritos + carrito */}
        <div className="flex items-center gap-2 justify-self-end">
          <a
            href="/favoritos"
            aria-label="Favoritos"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
            {totalFavoritos > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-semibold text-white">
                {totalFavoritos}
              </span>
            )}
          </a>

          <a
            href="/bolsa"
            aria-label="Bolsa de compras"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              {/* Bolsa grande (atrás) con el asa recortada en negativo */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 6.5a4.5 4.5 0 0 1 9 0v.5h1.5a1 1 0 0 1 1 1V13h-4.5a3 3 0 0 0-3 3v4.5H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1.5v-.5Zm2 .5h5v-.5a2.5 2.5 0 0 0-5 0V7Z"
              />
              {/* Bolsa pequeña (delante) con la "u" recortada */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 14a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-8Zm2.75 2.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a2.25 2.25 0 0 1-4.5 0v-1.5Z"
              />
            </svg>
            {totalBolsa > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-semibold text-white">
                {totalBolsa}
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Panel del menú desplegable */}
      {menuAbierto && (
        <>
          {/* Capa para cerrar al hacer clic fuera */}
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuAbierto(false)}
            className="fixed inset-0 z-30 cursor-default bg-black/20"
          />
          <nav className="absolute left-0 top-full z-40 w-64 border border-zinc-100 bg-white p-2 shadow-lg">
            <ul>
              {CATEGORIAS.map((cat) => (
                <li key={cat.nombre}>
                  <a
                    href={cat.href}
                    onClick={() => setMenuAbierto(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
                  >
                    {cat.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";

// Nombre de marca provisional — cámbialo cuando lo tengas decidido.
const NOMBRE_MARCA = "Tu Personal Shopper";

export default function Header() {
  const [busqueda, setBusqueda] = useState("");

  // Provisional: más adelante estos vendrán del estado real de la tienda.
  const totalFavoritos = 0;
  const totalCarrito = 0;

  function manejarBusqueda(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar con la búsqueda del catálogo.
    console.log("Buscar:", busqueda);
  }

  return (
    <header className="w-full border-b border-zinc-100">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
        {/* Izquierda: barra de búsqueda */}
        <div className="justify-self-start">
          <form onSubmit={manejarBusqueda} className="w-full max-w-xs" role="search">
            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 transition-colors focus-within:border-zinc-400">
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
                className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>
          </form>
        </div>

        {/* Centro: logo */}
        <div className="justify-self-center">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900 whitespace-nowrap"
          >
            {NOMBRE_MARCA}
          </a>
        </div>

        {/* Derecha: favoritos + carrito */}
        <div className="flex items-center gap-2 justify-self-end">
          <a
            href="/favoritos"
            aria-label="Favoritos"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            <svg
              className="h-5 w-5"
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
            href="/carrito"
            aria-label="Carrito de compra"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {totalCarrito > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-semibold text-white">
                {totalCarrito}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}

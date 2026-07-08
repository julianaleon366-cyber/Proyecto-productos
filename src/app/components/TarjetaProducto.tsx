"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBolsa } from "../lib/BolsaContext";
import { useFavoritos } from "../lib/FavoritosContext";
import type { Producto } from "../lib/productos";

const formateadorCop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function TarjetaProducto({ producto }: { producto: Producto }) {
  const { agregar } = useBolsa();
  const { esFavorito, alternar } = useFavoritos();
  const [anadido, setAnadido] = useState(false);

  const favorito = esFavorito(producto.id);

  function agregarABolsa() {
    agregar({
      id: producto.id,
      nombre: producto.nombre,
      precioCop: producto.precioCop,
    });
    setAnadido(true);
  }

  // Vuelve el botón a su estado normal tras un momento.
  useEffect(() => {
    if (!anadido) return;
    const id = setTimeout(() => setAnadido(false), 1800);
    return () => clearTimeout(id);
  }, [anadido]);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900 text-white transition-shadow hover:shadow-lg">
      {/* Botón favorito (corazón) */}
      <button
        type="button"
        onClick={() => alternar(producto.id)}
        aria-label={favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
        aria-pressed={favorito}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:scale-110 ${
          favorito ? "text-rose-500" : "text-zinc-900 hover:text-rose-400"
        }`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={favorito ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
        </svg>
      </button>

      {/* Imagen (o marcador piloto), clicable → detalle */}
      <Link
        href={`/producto/${producto.id}`}
        className="relative block aspect-square w-full"
      >
        {producto.piloto || !producto.imagen ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800 text-xs text-zinc-400">
            Imagen del producto
          </div>
        ) : (
          <div className="h-full w-full bg-white p-4">
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-4"
            />
          </div>
        )}
      </Link>

      {/* Información */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/producto/${producto.id}`}>
          <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-white transition-colors hover:text-zinc-300">
            {producto.nombre}
          </h3>
        </Link>

        {/* mt-auto empuja precio + botón al fondo de la tarjeta */}
        <p className="mt-auto pt-3 text-lg font-semibold text-white">
          {formateadorCop.format(producto.precioCop)}
        </p>

        <button
          type="button"
          onClick={agregarABolsa}
          className={`mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors ${
            anadido
              ? "bg-emerald-500 text-white"
              : "bg-white text-zinc-900 hover:bg-zinc-200"
          }`}
        >
          {anadido ? (
            <>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              ¡Añadido a la bolsa!
            </>
          ) : (
            "Añadir a la bolsa"
          )}
        </button>
      </div>
    </div>
  );
}

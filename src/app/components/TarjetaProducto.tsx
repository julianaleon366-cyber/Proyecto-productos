"use client";

import Image from "next/image";
import { useBolsa } from "../lib/BolsaContext";

export type Producto = {
  id: string;
  nombre: string;
  imagen: string;
  // Valoración de 0 a 5 (admite medias, ej. 4.5).
  estrellas: number;
  // Número de reseñas (opcional).
  resenas?: number;
  // Precio en pesos colombianos (COP), sin decimales.
  precioCop: number;
};

// Formatea un número como precio colombiano: $ 45.900
const formateadorCop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function Estrellas({ valor }: { valor: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${valor} de 5 estrellas`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        // Relleno de cada estrella: llena, media o vacía.
        const relleno = Math.max(0, Math.min(1, valor - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            {/* Estrella vacía (base) */}
            <StarSvg className="absolute inset-0 text-zinc-300" />
            {/* Estrella llena, recortada según el relleno */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${relleno * 100}%` }}
            >
              <StarSvg className="text-amber-400" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function StarSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-4 w-4 ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
    </svg>
  );
}

export default function TarjetaProducto({ producto }: { producto: Producto }) {
  const { agregar } = useBolsa();

  function agregarABolsa() {
    agregar({
      id: producto.id,
      nombre: producto.nombre,
      precioCop: producto.precioCop,
    });
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md">
      {/* Botón favorito (corazón) */}
      <button
        type="button"
        aria-label="Añadir a favoritos"
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-500 shadow-sm transition-colors hover:text-rose-500"
        // TODO: conectar con favoritos.
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
      </button>

      {/* Imagen del producto (completa, sin recortar) */}
      <div className="relative aspect-square w-full bg-white p-4">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain"
        />
      </div>

      {/* Información */}
      <div className="flex flex-1 flex-col p-4">
        {/* Altura fija para el nombre (2 líneas) → precio y botón quedan alineados entre tarjetas */}
        <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-zinc-900">
          {producto.nombre}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <Estrellas valor={producto.estrellas} />
          {producto.resenas != null && (
            <span className="text-xs text-zinc-400">({producto.resenas})</span>
          )}
        </div>

        {/* mt-auto empuja precio + botón al fondo de la tarjeta */}
        <p className="mt-auto pt-3 text-lg font-semibold text-zinc-900">
          {formateadorCop.format(producto.precioCop)}
        </p>

        <button
          type="button"
          onClick={agregarABolsa}
          className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          Añadir a la bolsa
        </button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBolsa } from "../../lib/BolsaContext";
import { useFavoritos } from "../../lib/FavoritosContext";
import type { Producto } from "../../lib/productos";
import { urlWhatsApp } from "../../lib/whatsapp";

const formateadorCop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function DetalleProducto({ producto }: { producto: Producto }) {
  const router = useRouter();
  const { agregar } = useBolsa();
  const { esFavorito, alternar } = useFavoritos();
  const [expandida, setExpandida] = useState(false);
  const [ampliada, setAmpliada] = useState(false);
  const [anadido, setAnadido] = useState(false);

  const favorito = esFavorito(producto.id);

  useEffect(() => {
    if (!anadido) return;
    const id = setTimeout(() => setAnadido(false), 1800);
    return () => clearTimeout(id);
  }, [anadido]);

  const mensaje = `¡Hola KAPRICHO! Estoy interesado/a en este producto: ${
    producto.nombre
  } (${formateadorCop.format(producto.precioCop)}).`;
  const enlaceWhatsApp = urlWhatsApp(mensaje);

  const parrafos = producto.descripcion
    ? producto.descripcion.split("\n\n")
    : [];
  // Cuando está colapsada, mostramos solo el primer párrafo.
  const parrafosVisibles = expandida ? parrafos : parrafos.slice(0, 1);
  const hayMas = parrafos.length > 1;

  const tieneImagen = !producto.piloto && !!producto.imagen;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      {/* Volver: vuelve a la página anterior (categoría o inicio, según de dónde vino) */}
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver
      </button>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* Imagen o marcador piloto */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          {!tieneImagen ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300 text-sm text-zinc-500">
              Imagen del producto
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAmpliada(true)}
              aria-label="Ampliar imagen"
              className="group relative h-full w-full cursor-zoom-in bg-white"
            >
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
                priority
              />
              {/* Icono de lupa */}
              <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm transition-colors group-hover:text-zinc-900">
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            {producto.nombre}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-zinc-900">
            {formateadorCop.format(producto.precioCop)}
          </p>

          {parrafos.length > 0 && (
            <div className="mt-6">
              <div className="space-y-3 text-base leading-7 text-zinc-600">
                {parrafosVisibles.map((parrafo, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {parrafo}
                  </p>
                ))}
              </div>
              {hayMas && (
                <button
                  type="button"
                  onClick={() => setExpandida((v) => !v)}
                  className="mt-2 text-sm font-semibold text-zinc-900 underline underline-offset-2 hover:text-zinc-600"
                >
                  {expandida ? "Leer menos" : "Leer más"}
                </button>
              )}
            </div>
          )}

          {/* Acciones */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  agregar({
                    id: producto.id,
                    nombre: producto.nombre,
                    precioCop: producto.precioCop,
                  });
                  setAnadido(true);
                }}
                className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold transition-colors ${
                  anadido
                    ? "bg-emerald-500 text-white"
                    : "bg-zinc-900 text-white hover:bg-zinc-700"
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

              {/* Favorito */}
              <button
                type="button"
                onClick={() => alternar(producto.id)}
                aria-label={
                  favorito ? "Quitar de favoritos" : "Añadir a favoritos"
                }
                aria-pressed={favorito}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  favorito
                    ? "border-rose-500 bg-rose-50 text-rose-500"
                    : "border-zinc-300 text-zinc-700 hover:border-zinc-900"
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
            </div>
            <a
              href={enlaceWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center rounded-full border border-zinc-300 px-8 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-900"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <p className="mt-4 text-xs leading-5 text-zinc-500">
            El precio es una estimación. Confirmamos disponibilidad y el precio
            final por WhatsApp antes de cualquier pago.
          </p>
        </div>
      </div>

      {/* Lightbox: imagen ampliada a pantalla completa */}
      {ampliada && tieneImagen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${producto.nombre}`}
          onClick={() => setAmpliada(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
        >
          {/* Botón cerrar */}
          <button
            type="button"
            onClick={() => setAmpliada(false)}
            aria-label="Cerrar"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
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

          {/* Imagen grande (el clic sobre ella no cierra) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[85vh] w-full max-w-3xl"
          >
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}

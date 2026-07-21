"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { mensajeCompraEnDirecto, urlWhatsApp } from "../lib/whatsapp";

// ⚠️ Imágenes que van rotando para simular un directo (cámara grabando).
//    Mezcla de todas las categorías para mostrar variedad. Cambia/añade las
//    que quieras que se vayan mostrando en la burbuja.
const IMAGENES_DIRECTO = [
  "/imagenes/collage_skincare.png",
  "/imagenes/1_moda.png",
  "/imagenes/collage_maquillaje.png",
  "/imagenes/collage_capilar.png",
  "/imagenes/2_moda.png",
  "/imagenes/collage_suplementos.png",
  "/imagenes/3_moda.png",
];
const INTERVALO_MS = 2500;

// El botón abre WhatsApp para entrar/reservar el directo.
const ENLACE_DIRECTO = urlWhatsApp(mensajeCompraEnDirecto());

export default function BurbujaEnDirecto() {
  const [montada, setMontada] = useState(false); // control de aparición diferida
  const [visible, setVisible] = useState(false); // controla el fade/slide de entrada
  const [expandida, setExpandida] = useState(false); // hover (escritorio) o tap (móvil)
  const [cerrada, setCerrada] = useState(false);
  const [indice, setIndice] = useState(0); // imagen actual del "directo"

  // Aparición diferida: se monta a los 3s y luego se anima la entrada.
  useEffect(() => {
    const idMontar = setTimeout(() => {
      setMontada(true);
      // pequeño retardo para que la transición de entrada se dispare
      requestAnimationFrame(() => setVisible(true));
    }, 3000);
    return () => clearTimeout(idMontar);
  }, []);

  // Rotación de imágenes para simular la cámara en directo.
  useEffect(() => {
    if (!montada) return;
    const id = setInterval(() => {
      setIndice((i) => (i + 1) % IMAGENES_DIRECTO.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [montada]);

  if (cerrada || !montada) return null;

  return (
    <div
      // Encima del botón flotante de WhatsApp (bottom-24) para que no se solapen.
      className={`fixed bottom-24 right-4 z-50 transition-all duration-500 ease-out sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* Contenedor que crece al expandirse (hover en escritorio, tap en móvil) */}
      <div
        onMouseEnter={() => setExpandida(true)}
        onMouseLeave={() => setExpandida(false)}
        onClick={() => setExpandida(true)}
        className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-zinc-900 shadow-2xl ring-1 ring-black/5 transition-all duration-300 ease-out ${
          expandida ? "w-64 sm:w-72" : "w-28 sm:w-32"
        }`}
      >
        {/* Botón cerrar (X) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
            // espera al fade-out antes de desmontar
            setTimeout(() => setCerrada(true), 300);
          }}
          aria-label="Cerrar"
          className="absolute right-1.5 top-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Micro-vídeo en la parte de arriba (siempre visible) */}
        <div
          className={`relative w-full overflow-hidden transition-all duration-300 ${
            expandida ? "aspect-video" : "aspect-square"
          }`}
        >
          {/* Badge "EN DIRECTO" con parpadeo */}
          <span className="absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_0_10px_rgba(239,68,68,0.8)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            En directo
          </span>

          {/* Imágenes que se van intercambiando (simula la cámara en directo) */}
          {IMAGENES_DIRECTO.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Compra en directo"
              fill
              sizes="288px"
              priority
              className={`object-cover transition-opacity duration-500 ${
                i === indice ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Área de texto: solo visible al expandirse */}
        <div
          className={`overflow-hidden bg-white transition-all duration-300 ${
            expandida ? "max-h-52 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4">
            <p className="text-sm font-semibold leading-snug text-zinc-900">
              Compra en directo con tu personal shopper
            </p>
            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Te enseñamos los productos en vivo desde España. Reserva por
              WhatsApp.
            </p>
            <a
              href={ENLACE_DIRECTO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full bg-zinc-900 text-xs font-semibold text-white transition-all hover:bg-zinc-700 hover:shadow-lg"
            >
              Reservar por WhatsApp
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
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

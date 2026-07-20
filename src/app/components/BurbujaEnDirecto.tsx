"use client";

import { useEffect, useState } from "react";
import { mensajeCompraEnDirecto, urlWhatsApp } from "../lib/whatsapp";

// ⚠️ REEMPLAZA por la URL de tu micro-vídeo (mp4/webm) cuando lo tengas.
//    Debe estar en /public (ej. "/videos/live.mp4"). Mientras tanto se usa el
//    "poster" (imagen fija) de abajo como respaldo.
const VIDEO_URL = "";
// ⚠️ Imagen que se muestra mientras el vídeo carga (o si no hay vídeo).
const VIDEO_POSTER = "/imagenes/1_moda.png";

// ⚠️ Enlace final al directo. Por defecto abre WhatsApp para reservar/entrar.
//    Si tienes un enlace de Instagram Live / evento, ponlo aquí.
const ENLACE_DIRECTO = urlWhatsApp(mensajeCompraEnDirecto());

export default function BurbujaEnDirecto() {
  const [montada, setMontada] = useState(false); // control de aparición diferida
  const [visible, setVisible] = useState(false); // controla el fade/slide de entrada
  const [expandida, setExpandida] = useState(false); // hover (escritorio) o tap (móvil)
  const [cerrada, setCerrada] = useState(false);

  // Aparición diferida: se monta a los 3s y luego se anima la entrada.
  useEffect(() => {
    const idMontar = setTimeout(() => {
      setMontada(true);
      // pequeño retardo para que la transición de entrada se dispare
      requestAnimationFrame(() => setVisible(true));
    }, 3000);
    return () => clearTimeout(idMontar);
  }, []);

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

          <video
            className="h-full w-full object-cover"
            poster={VIDEO_POSTER}
            muted
            autoPlay
            loop
            playsInline
          >
            {VIDEO_URL && <source src={VIDEO_URL} type="video/mp4" />}
          </video>
        </div>

        {/* Área de texto: solo visible al expandirse */}
        <div
          className={`overflow-hidden bg-white transition-all duration-300 ${
            expandida ? "max-h-52 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4">
            <p className="text-sm font-semibold leading-snug text-zinc-900">
              👗 Probador VIP en Vivo
            </p>
            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Únete ahora y mira la nueva colección en directo.
            </p>
            <a
              href={ENLACE_DIRECTO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full bg-zinc-900 text-xs font-semibold text-white transition-all hover:bg-zinc-700 hover:shadow-lg"
            >
              Entrar al Directo
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

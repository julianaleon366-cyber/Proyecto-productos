"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type ProductoDestacado = {
  nombre: string;
  descripcion: string;
  imagen: string;
  href: string;
  // Texto del botón (por defecto "Comprar ahora"). Ej: "Cómo funciona" para moda.
  textoBoton?: string;
  // Si es una diapositiva de moda/bajo pedido (sin imagen aún), muestra un marcador.
  esMarcador?: boolean;
};

const INTERVALO_MS = 5000;
const TRANSICION_MS = 700;
// Distancia mínima (px) de arrastre con el dedo para contar como "deslizar".
const UMBRAL_SWIPE = 50;

export default function CarruselProductos({
  productos,
}: {
  productos: ProductoDestacado[];
}) {
  const total = productos.length;

  // Índice sobre la lista con clones: la posición 0 es un clon del último, y la
  // posición total+1 es un clon del primero. Los reales van de 1 a total.
  // Esto permite el bucle infinito en AMBOS sentidos (adelante y atrás).
  const [indice, setIndice] = useState(1);
  // Controla si el desplazamiento se anima (false = salto instantáneo invisible).
  const [conTransicion, setConTransicion] = useState(true);
  // Guarda qué imágenes (por su ruta) ya terminaron de cargar.
  const [cargadas, setCargadas] = useState<Record<string, boolean>>({});
  // Mientras el cliente interactúa (ratón encima, dedo o flecha) el auto se pausa.
  const [pausado, setPausado] = useState(false);

  // Lista con clones a ambos lados: [últimoClon, ...reales, primerClon].
  const diapositivas =
    total > 1
      ? [productos[total - 1], ...productos, productos[0]]
      : productos;

  // El índice "real" (0..total-1) que se muestra, para pintar los puntitos.
  const indiceReal = total > 1 ? (indice - 1 + total) % total : 0;

  // Tras aterrizar en un clon, salta sin animación a la diapositiva real gemela.
  function normalizarSiEsClon(i: number) {
    if (total <= 1) return;
    if (i === 0 || i === total + 1) {
      setTimeout(() => {
        setConTransicion(false);
        setIndice(i === 0 ? total : 1);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setConTransicion(true))
        );
      }, TRANSICION_MS);
    }
  }

  const avanzar = useCallback(() => {
    if (total <= 1) return;
    setConTransicion(true);
    setIndice((i) => {
      const siguiente = i + 1;
      normalizarSiEsClon(siguiente);
      return siguiente;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const retroceder = useCallback(() => {
    if (total <= 1) return;
    setConTransicion(true);
    setIndice((i) => {
      const anterior = i - 1;
      normalizarSiEsClon(anterior);
      return anterior;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // Salta directamente a una diapositiva concreta (desde los puntitos).
  const irA = useCallback((real: number) => {
    setConTransicion(true);
    setIndice(real + 1); // +1 por el clon inicial
  }, []);

  // Paso automático: corre salvo que esté pausado o la pestaña esté oculta.
  useEffect(() => {
    if (total <= 1 || pausado) return;

    let intervalo: ReturnType<typeof setInterval> | undefined;
    const iniciar = () => {
      intervalo = setInterval(avanzar, INTERVALO_MS);
    };
    const detener = () => {
      if (intervalo) clearInterval(intervalo);
      intervalo = undefined;
    };

    function alCambiarVisibilidad() {
      if (document.hidden) detener();
      else {
        detener();
        iniciar();
      }
    }

    iniciar();
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    return () => {
      detener();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
    };
  }, [total, pausado, avanzar]);

  // --- Deslizar con el dedo (swipe) en móvil ---
  const inicioX = useRef<number | null>(null);
  function alTocarInicio(e: React.TouchEvent) {
    inicioX.current = e.touches[0].clientX;
    setPausado(true);
  }
  function alTocarFin(e: React.TouchEvent) {
    if (inicioX.current !== null) {
      const delta = e.changedTouches[0].clientX - inicioX.current;
      if (delta > UMBRAL_SWIPE) retroceder();
      else if (delta < -UMBRAL_SWIPE) avanzar();
    }
    inicioX.current = null;
    setPausado(false);
  }

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-zinc-100"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onTouchStart={alTocarInicio}
      onTouchEnd={alTocarFin}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${indice * 100}%)`,
          transition: conTransicion
            ? `transform ${TRANSICION_MS}ms ease-in-out`
            : "none",
        }}
      >
        {diapositivas.map((producto, i) => {
          const cargada = cargadas[producto.imagen];
          return (
            <div
              key={i}
              className="relative flex aspect-[1456/1080] w-full shrink-0 items-center overflow-hidden bg-zinc-100 p-5 sm:p-12"
            >
              {producto.esMarcador ? (
                /* Diapositiva de moda sin imagen aún: fondo con marcador */
                <div className="absolute inset-0 flex items-center justify-end bg-gradient-to-br from-zinc-200 to-zinc-300">
                  <span className="mr-10 hidden text-sm text-zinc-500 sm:block">
                    Imagen de moda
                  </span>
                </div>
              ) : (
                <>
                  {/* Imagen de fondo optimizada (llena el bloque, detrás del texto) */}
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority={i <= 1}
                    onLoad={() =>
                      setCargadas((prev) => ({
                        ...prev,
                        [producto.imagen]: true,
                      }))
                    }
                    className={`object-cover transition-opacity duration-500 ${
                      cargada ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Skeleton mientras la imagen carga */}
                  {!cargada && (
                    <div
                      className="absolute inset-0 animate-pulse bg-zinc-200"
                      aria-hidden="true"
                    />
                  )}
                </>
              )}

              {/* Degradado claro por la izquierda para que el texto sea legible */}
              {!producto.esMarcador && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent sm:via-white/60 sm:to-transparent"
                  aria-hidden="true"
                />
              )}

              {/* Texto encima, a la izquierda */}
              <div className="relative flex max-w-[70%] flex-col items-start sm:max-w-sm">
                <h2 className="text-xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-3xl">
                  {producto.nombre}
                </h2>
                <p className="mt-3 text-xs leading-5 text-zinc-700 sm:mt-4 sm:text-sm sm:leading-6">
                  {producto.descripcion}
                </p>
                <a
                  href={producto.href}
                  className="mt-4 flex h-10 items-center justify-center rounded-full bg-zinc-900 px-5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700 sm:mt-8 sm:h-12 sm:px-8 sm:text-sm"
                >
                  {producto.textoBoton ?? "Comprar ahora"}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles (solo si hay más de una diapositiva) */}
      {total > 1 && (
        <>
          {/* Flecha anterior */}
          <button
            type="button"
            onClick={retroceder}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-zinc-900 opacity-0 shadow-sm backdrop-blur transition-opacity hover:bg-white focus:opacity-100 focus:outline-none group-hover:opacity-100 sm:left-4 sm:h-11 sm:w-11"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Flecha siguiente */}
          <button
            type="button"
            onClick={avanzar}
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-zinc-900 opacity-0 shadow-sm backdrop-blur transition-opacity hover:bg-white focus:opacity-100 focus:outline-none group-hover:opacity-100 sm:right-4 sm:h-11 sm:w-11"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Puntitos indicadores */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-4">
            {productos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => irA(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                aria-current={i === indiceReal}
                className={`h-2 rounded-full transition-all ${
                  i === indiceReal
                    ? "w-6 bg-zinc-900"
                    : "w-2 bg-zinc-900/40 hover:bg-zinc-900/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

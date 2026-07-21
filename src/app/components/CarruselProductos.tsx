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

const TRANSICION_MS = 700;
// Avance automático lento: cambia de diapositiva cada 6 segundos.
const INTERVALO_MS = 6000;
// Distancia mínima (px) de arrastre con el dedo/ratón para contar como "deslizar".
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

  // Lista con clones a ambos lados: [últimoClon, ...reales, primerClon].
  const diapositivas =
    total > 1 ? [productos[total - 1], ...productos, productos[0]] : productos;

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

  // Avance automático lento (se pausa cuando la pestaña está oculta).
  useEffect(() => {
    if (total <= 1) return;

    let intervalo: ReturnType<typeof setInterval> | undefined;
    const iniciar = () => {
      intervalo = setInterval(avanzar, INTERVALO_MS);
    };
    const detener = () => {
      if (intervalo) clearInterval(intervalo);
      intervalo = undefined;
    };

    function alCambiarVisibilidad() {
      detener();
      if (!document.hidden) iniciar();
    }

    iniciar();
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    return () => {
      detener();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
    };
  }, [total, avanzar]);

  // --- Deslizar para navegar (funciona con dedo en móvil y ratón en escritorio) ---
  const inicioX = useRef<number | null>(null);

  function alDeslizarFin(finX: number) {
    if (inicioX.current === null) return;
    const delta = finX - inicioX.current;
    if (delta > UMBRAL_SWIPE) retroceder();
    else if (delta < -UMBRAL_SWIPE) avanzar();
    inicioX.current = null;
  }

  return (
    <div
      className="relative cursor-grab overflow-hidden rounded-2xl bg-zinc-100 active:cursor-grabbing"
      onTouchStart={(e) => (inicioX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => alDeslizarFin(e.changedTouches[0].clientX)}
      onMouseDown={(e) => (inicioX.current = e.clientX)}
      onMouseUp={(e) => alDeslizarFin(e.clientX)}
      onMouseLeave={() => (inicioX.current = null)}
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
                <div className="absolute inset-0 flex items-center justify-end bg-gradient-to-br from-[#e0e5ee] to-[#cdd4e0]">
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
                    // Evita que el navegador "arrastre" la imagen al deslizar con el ratón.
                    draggable={false}
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
                  // No dispares el enlace si el usuario estaba deslizando.
                  draggable={false}
                  className="mt-4 flex h-10 items-center justify-center rounded-full bg-zinc-900 px-5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700 sm:mt-8 sm:h-12 sm:px-8 sm:text-sm"
                >
                  {producto.textoBoton ?? "Comprar ahora"}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flechas de navegación */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={retroceder}
            aria-label="Anterior"
            className="absolute left-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/40 text-white shadow-md backdrop-blur transition-colors hover:bg-zinc-900/60 sm:left-2.5 sm:h-8 sm:w-8"
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
          </button>
          <button
            type="button"
            onClick={avanzar}
            aria-label="Siguiente"
            className="absolute right-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/40 text-white shadow-md backdrop-blur transition-colors hover:bg-zinc-900/60 sm:right-2.5 sm:h-8 sm:w-8"
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

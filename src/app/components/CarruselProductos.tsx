"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function CarruselProductos({
  productos,
}: {
  productos: ProductoDestacado[];
}) {
  const total = productos.length;

  // Índice sobre la lista con clon: va de 0 a total (la posición `total` es el clon del primero).
  const [indice, setIndice] = useState(0);
  // Controla si el desplazamiento se anima (false = salto instantáneo invisible).
  const [conTransicion, setConTransicion] = useState(true);
  // Guarda qué imágenes (por su ruta) ya terminaron de cargar.
  const [cargadas, setCargadas] = useState<Record<string, boolean>>({});

  // Lista con el primer producto clonado al final → permite el bucle infinito hacia adelante.
  const diapositivas = total > 1 ? [...productos, productos[0]] : productos;

  useEffect(() => {
    if (total <= 1) return;

    let intervalo: ReturnType<typeof setInterval> | undefined;
    let saltoTimeout: ReturnType<typeof setTimeout> | undefined;

    function avanzar() {
      setIndice((i) => {
        const siguiente = i + 1;
        // Si aterrizamos en el clon, tras la animación saltamos sin transición al primero real.
        if (siguiente === total) {
          saltoTimeout = setTimeout(() => {
            setConTransicion(false);
            setIndice(0);
            // Reactivamos la transición en el siguiente frame para futuros avances.
            requestAnimationFrame(() =>
              requestAnimationFrame(() => setConTransicion(true))
            );
          }, TRANSICION_MS);
        }
        return siguiente;
      });
    }

    function iniciar() {
      detener();
      intervalo = setInterval(avanzar, INTERVALO_MS);
    }

    function detener() {
      if (intervalo) clearInterval(intervalo);
      if (saltoTimeout) clearTimeout(saltoTimeout);
      intervalo = undefined;
      saltoTimeout = undefined;
    }

    // Pausa cuando la pestaña no está visible; reanuda (desde una posición válida) al volver.
    function alCambiarVisibilidad() {
      if (document.hidden) {
        detener();
      } else {
        iniciar();
      }
    }

    iniciar();
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    return () => {
      detener();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
    };
  }, [total]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-100">
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
                  // La primera imagen es prioritaria (se ve al cargar); las demás, normales.
                  priority={i === 0}
                  onLoad={() =>
                    setCargadas((prev) => ({ ...prev, [producto.imagen]: true }))
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

            {/* Degradado claro por la izquierda para que el texto sea legible
                sobre cualquier imagen (más fuerte en móvil, donde el bloque es estrecho) */}
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
    </div>
  );
}

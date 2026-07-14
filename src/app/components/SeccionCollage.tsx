import Image from "next/image";
import Link from "next/link";
import { urlWhatsApp } from "../lib/whatsapp";

export type Seccion = {
  id: string;
  titulo: string;
  descripcion: string;
  // Rutas de imágenes para montar el collage en mosaico (6 recomendadas).
  imagenes: string[];
  // Alternativa: una sola imagen que YA es un collage montado. Si se usa,
  // se muestra esta en vez del mosaico de varias imágenes.
  collageUnico?: string;
  // Texto del botón, ej. "Pide tu skincare por WhatsApp".
  textoBoton: string;
  // Mensaje que se manda por WhatsApp al pulsar el botón.
  mensajeWhatsApp: string;
  // Alterna el fondo entre blanco y gris muy suave.
  fondoGris?: boolean;
};

// Patrón de mosaico: algunas imágenes ocupan más columnas/filas para que el
// collage no se vea como una cuadrícula rígida. El patrón se repite cada 6.
// En la rejilla base (4 columnas en ordenador), 2 imágenes por ciclo son grandes.
const PATRON_MOSAICO = [
  "col-span-2 row-span-2", // grande (2x2)
  "col-span-2", // ancha (2x1)
  "", // normal
  "", // normal
  "row-span-2", // alta (1x2)
  "", // normal
];

export default function SeccionCollage({ seccion }: { seccion: Seccion }) {
  return (
    <section
      id={seccion.id}
      className={`w-full scroll-mt-6 px-6 py-16 ${
        seccion.fondoGris ? "bg-zinc-50" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        {/* Encabezado */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            {seccion.titulo}
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            {seccion.descripcion}
          </p>
        </div>

        {seccion.collageUnico ? (
          /* Collage ya montado en una sola imagen */
          <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-xl bg-white">
            <Image
              src={seccion.collageUnico}
              alt={seccion.titulo}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        ) : (
          /* Collage en mosaico a partir de varias imágenes */
          <div className="mt-8 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:gap-4 md:grid-cols-4">
            {seccion.imagenes.map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl bg-white ${
                  PATRON_MOSAICO[i % PATRON_MOSAICO.length]
                }`}
              >
                <Image
                  src={src}
                  alt={`${seccion.titulo} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {/* Botones: cómo funciona (a la página de pasos) + pedir por WhatsApp (directo) */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/como-funciona"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 px-8 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-900"
          >
            Cómo funciona
          </Link>
          <a
            href={urlWhatsApp(seccion.mensajeWhatsApp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            {seccion.textoBoton}
          </a>
        </div>
      </div>
    </section>
  );
}

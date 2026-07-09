import Link from "next/link";
import TarjetaProducto from "./TarjetaProducto";
import type { Categoria } from "../lib/productos";

// Productos visibles en la home antes de "Ver más": móvil 2, ordenador 4.
const VISIBLES_MOVIL = 2;
const VISIBLES_ORDENADOR = 4;

export default function SeccionCategoria({
  categoria,
}: {
  categoria: Categoria;
}) {
  const productos = categoria.productos;
  // "Ver más" solo si hay más productos de los que caben en la home (4 en
  // ordenador). Con 4 o menos, se muestran todos y no hace falta el enlace.
  const hayMas = productos.length > VISIBLES_ORDENADOR;

  return (
    <section id={categoria.id} className="mb-16 last:mb-0">
      {/* Cabecera: título a la izquierda, "Ver más" a la derecha */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          {categoria.titulo}
        </h2>
        {hayMas && (
          <Link
            href={`/categoria/${categoria.id}`}
            className="flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            Ver más
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
          </Link>
        )}
      </div>

      {/* Cuadrícula: en móvil se ven 2, en ordenador 4 (el resto oculto) */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {productos.map((producto, i) => {
          // Si hay "Ver más", en la home limitamos lo visible (2 móvil / 4 ordenador)
          // y el resto se ve al entrar a la categoría. Si no hay "Ver más", se
          // muestran todos (no ocultamos nada).
          const claseOculto = !hayMas
            ? ""
            : i >= VISIBLES_ORDENADOR
            ? "hidden"
            : i >= VISIBLES_MOVIL
            ? "hidden sm:block"
            : "";
          return (
            <div key={producto.id} className={claseOculto}>
              <TarjetaProducto producto={producto} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

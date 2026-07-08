"use client";

import Link from "next/link";
import BannerInformativo from "../components/BannerInformativo";
import Header from "../components/Header";
import FilaProducto from "../components/FilaProducto";
import { useBolsa } from "../lib/BolsaContext";
import { useFavoritos } from "../lib/FavoritosContext";
import { buscarProducto } from "../lib/productos";

export default function PaginaFavoritos() {
  const { ids, alternar } = useFavoritos();
  const { agregar } = useBolsa();

  // Convierte los ids guardados en productos (descarta los que ya no existan).
  const productos = ids
    .map((id) => buscarProducto(id))
    .filter((p) => p !== undefined);

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <BannerInformativo />
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Mis favoritos
        </h1>

        {productos.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md rounded-2xl border border-zinc-100 bg-zinc-50 p-10 text-center">
            <p className="text-base font-medium text-zinc-900">
              Aún no tienes favoritos.
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Guarda los productos que te gusten con el corazón y los verás aquí.
            </p>
            <Link
              href="/#catalogo"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-zinc-500">
              {productos.length}{" "}
              {productos.length === 1
                ? "producto guardado"
                : "productos guardados"}
            </p>
            <div className="mt-6 divide-y divide-zinc-100">
              {productos.map((producto) => (
                <FilaProducto
                  key={producto.id}
                  id={producto.id}
                  nombre={producto.nombre}
                  imagen={producto.imagen}
                  precioCop={producto.precioCop}
                  piloto={producto.piloto}
                  acciones={
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          agregar({
                            id: producto.id,
                            nombre: producto.nombre,
                            precioCop: producto.precioCop,
                          })
                        }
                        className="flex h-10 items-center justify-center rounded-full bg-zinc-900 px-5 text-xs font-semibold text-white transition-colors hover:bg-zinc-700 sm:text-sm"
                      >
                        Añadir a la bolsa
                      </button>
                      <button
                        type="button"
                        onClick={() => alternar(producto.id)}
                        aria-label="Quitar de favoritos"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-rose-500 transition-colors hover:bg-rose-50"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
                        </svg>
                      </button>
                    </>
                  }
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const formateadorCop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

type Props = {
  id: string;
  nombre: string;
  imagen: string;
  precioCop: number;
  piloto?: boolean;
  // Texto extra bajo el precio (ej. "Cantidad: 2").
  detalle?: string;
  // Acciones a la derecha (botones): distintas en bolsa vs favoritos.
  acciones?: ReactNode;
};

export default function FilaProducto({
  id,
  nombre,
  imagen,
  precioCop,
  piloto,
  detalle,
  acciones,
}: Props) {
  const tieneImagen = !piloto && !!imagen;

  return (
    <div className="flex items-center gap-4 py-4 sm:gap-6">
      {/* Imagen a un lado (clicable → detalle) */}
      <Link
        href={`/producto/${id}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white sm:h-24 sm:w-24"
      >
        {tieneImagen ? (
          <Image
            src={imagen}
            alt={nombre}
            fill
            sizes="96px"
            className="object-contain p-2"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-center text-[10px] leading-tight text-zinc-400">
            Imagen del producto
          </div>
        )}
      </Link>

      {/* Info + acciones al otro lado */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link href={`/producto/${id}`}>
            <h3 className="line-clamp-2 text-sm font-medium leading-5 text-zinc-900 transition-colors hover:text-zinc-600">
              {nombre}
            </h3>
          </Link>
          <p className="mt-1 text-base font-semibold text-zinc-900">
            {formateadorCop.format(precioCop)}
          </p>
          {detalle && (
            <p className="mt-0.5 text-sm text-zinc-500">{detalle}</p>
          )}
        </div>

        {acciones && (
          <div className="flex shrink-0 items-center gap-3">{acciones}</div>
        )}
      </div>
    </div>
  );
}

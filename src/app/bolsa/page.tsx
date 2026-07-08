"use client";

import Link from "next/link";
import BannerInformativo from "../components/BannerInformativo";
import Header from "../components/Header";
import { useBolsa } from "../lib/BolsaContext";
import { mensajeCotizarBolsa, urlWhatsApp } from "../lib/whatsapp";

const formateadorCop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function PaginaBolsa() {
  const { items, quitar, vaciar } = useBolsa();

  const total = items.reduce((s, i) => s + i.precioCop * i.cantidad, 0);
  const enlaceWhatsApp = urlWhatsApp(mensajeCotizarBolsa(items));

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <BannerInformativo />
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Mi bolsa
        </h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-zinc-100 bg-zinc-50 p-10 text-center">
            <p className="text-zinc-600">Tu bolsa está vacía.</p>
            <Link
              href="/"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <ul className="mt-8 divide-y divide-zinc-100">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900">
                      {item.nombre}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Cantidad: {item.cantidad} ·{" "}
                      {formateadorCop.format(item.precioCop * item.cantidad)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => quitar(item.id)}
                    className="shrink-0 text-sm font-medium text-zinc-400 transition-colors hover:text-rose-500"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-6">
              <span className="text-sm text-zinc-500">Total estimado</span>
              <span className="text-xl font-semibold text-zinc-900">
                {formateadorCop.format(total)}
              </span>
            </div>

            {/* Aviso: el precio es estimado, se confirma por WhatsApp */}
            <p className="mt-4 text-xs leading-5 text-zinc-500">
              El total es una estimación. Confirmamos disponibilidad y el precio
              final por WhatsApp antes de cualquier pago.
            </p>

            {/* Acción principal: cotizar por WhatsApp */}
            <a
              href={enlaceWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Confirmar disponibilidad y cotizar pedido por WhatsApp
            </a>

            <button
              type="button"
              onClick={vaciar}
              className="mt-3 w-full text-center text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-700"
            >
              Vaciar bolsa
            </button>
          </>
        )}
      </main>
    </div>
  );
}

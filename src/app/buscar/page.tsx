import BannerInformativo from "../components/BannerInformativo";
import Header from "../components/Header";
import TarjetaProducto from "../components/TarjetaProducto";
import { buscarProductos } from "../lib/productos";
import { mensajePedidoEspecial, urlWhatsApp } from "../lib/whatsapp";

export default async function PaginaBuscar({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const termino = (q ?? "").trim();
  const resultados = termino ? buscarProductos(termino) : [];

  // Mensaje de WhatsApp que incluye lo que el cliente buscaba.
  const mensajeWa = termino
    ? `¡Hola KAPRICHO! Estoy buscando "${termino}" y no lo encontré en la web. ¿Me lo pueden conseguir?`
    : mensajePedidoEspecial();

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <BannerInformativo />
      <Header />

      <main className="w-full flex-1 px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {termino ? (
            <>
              Resultados para{" "}
              <span className="text-zinc-500">&ldquo;{termino}&rdquo;</span>
            </>
          ) : (
            "Buscar productos"
          )}
        </h1>

        {resultados.length > 0 ? (
          <>
            <p className="mt-2 text-sm text-zinc-500">
              {resultados.length}{" "}
              {resultados.length === 1
                ? "producto encontrado"
                : "productos encontrados"}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {resultados.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>
          </>
        ) : (
          /* Sin resultados: mensaje + botón de WhatsApp para pedirlo */
          <div className="mx-auto mt-12 max-w-md rounded-2xl border border-zinc-100 bg-zinc-50 p-10 text-center">
            <p className="text-base font-medium text-zinc-900">
              {termino
                ? "No encontramos ese producto en nuestro catálogo."
                : "Escribe algo para buscar."}
            </p>
            {termino && (
              <>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  ¡Pero no te preocupes! Trabajamos bajo pedido y podemos
                  conseguírtelo desde España. Escríbenos y lo cotizamos.
                </p>
                <a
                  href={urlWhatsApp(mensajeWa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
                >
                  Pedirlo por WhatsApp
                </a>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

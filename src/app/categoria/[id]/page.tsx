import { notFound } from "next/navigation";
import BannerInformativo from "../../components/BannerInformativo";
import Header from "../../components/Header";
import TarjetaProducto from "../../components/TarjetaProducto";
import { buscarCategoria } from "../../lib/productos";

export default async function PaginaCategoria({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoria = buscarCategoria(id);

  if (!categoria) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <BannerInformativo />
      <Header />

      <main className="w-full flex-1 px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {categoria.titulo}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {categoria.productos.length}{" "}
          {categoria.productos.length === 1 ? "producto" : "productos"}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {categoria.productos.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      </main>
    </div>
  );
}

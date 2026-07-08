import { notFound } from "next/navigation";
import BannerInformativo from "../../components/BannerInformativo";
import Header from "../../components/Header";
import { buscarProducto } from "../../lib/productos";
import DetalleProducto from "./DetalleProducto";

export default async function PaginaProducto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = buscarProducto(id);

  if (!producto) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <BannerInformativo />
      <Header />
      <DetalleProducto producto={producto} />
    </div>
  );
}

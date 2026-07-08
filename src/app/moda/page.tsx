import BannerInformativo from "../components/BannerInformativo";
import Header from "../components/Header";
import { mensajeModaBajoPedido, urlWhatsApp } from "../lib/whatsapp";

const PASOS = [
  {
    numero: "1",
    titulo: "Compra virtual en España",
    texto:
      "Busca en las apps oficiales de tiendas españolas como Zara, Mango, Stradivarius, etc., la prenda, el zapato o el accesorio que quieres, en tu talla.",
  },
  {
    numero: "2",
    titulo: "Captura y envía",
    texto:
      "Toma una captura de pantalla donde se vea la referencia, la talla y el color, o copia el enlace del producto.",
  },
  {
    numero: "3",
    titulo: "Cotización en 5 minutos",
    texto:
      "Nos lo mandas por WhatsApp y te damos el precio final estimado en pesos colombianos, con envío incluido.",
  },
];

export default function PaginaModa() {
  const enlaceWhatsApp = urlWhatsApp(mensajeModaBajoPedido());

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <BannerInformativo />
      <Header />

      <main className="w-full px-6 py-16">
        {/* Encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Moda · Zapatos · Accesorios
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ropa, zapatos y accesorios de España, bajo pedido
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            No tenemos prendas en stock: te conseguimos exactamente lo que
            quieres de las tiendas españolas. Así de fácil:
          </p>
        </div>

        {/* Los 3 pasos */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
          {PASOS.map((paso) => (
            <div
              key={paso.numero}
              className="flex flex-col items-center rounded-2xl border border-zinc-100 bg-zinc-50 p-8 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-lg font-bold text-white">
                {paso.numero}
              </span>
              <h2 className="mt-5 text-lg font-semibold tracking-tight text-zinc-900">
                {paso.titulo}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {paso.texto}
              </p>
            </div>
          ))}
        </div>

        {/* Botón principal */}
        <div className="mt-14 flex flex-col items-center">
          <a
            href={enlaceWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center rounded-full bg-zinc-900 px-10 text-base font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Enviar mi captura por WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}

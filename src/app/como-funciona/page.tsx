import BannerInformativo from "../components/BannerInformativo";
import Header from "../components/Header";
import { mensajePedidoEspecial, urlWhatsApp } from "../lib/whatsapp";

const PASOS = [
  {
    numero: "1",
    titulo: "Dinos qué quieres",
    texto:
      "Cuéntanos qué producto o prenda buscas. Para skincare, maquillaje, capilar o suplementos, solo dinos el nombre. Para ropa y accesorios, mándanos una captura o el enlace, con tu talla y color.",
  },
  {
    numero: "2",
    titulo: "Te cotizamos",
    texto:
      "Confirmamos la disponibilidad y te damos el precio final estimado en pesos colombianos, con el envío incluido. Sin compromiso.",
  },
  {
    numero: "3",
    titulo: "Lo compramos y te lo enviamos",
    texto:
      "Si te encaja, aseguras tu pedido con un anticipo (Nequi o Bancolombia). Compramos tu producto original en España y te lo enviamos directamente a Colombia.",
  },
];

export default function PaginaComoFunciona() {
  const enlaceWhatsApp = urlWhatsApp(mensajePedidoEspecial());

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <BannerInformativo />
      <Header />

      <main className="w-full px-6 py-16">
        {/* Encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Cómo funciona
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Pedir es muy fácil
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Somos tu personal shopper en España: te conseguimos lo que quieras y
            te lo enviamos a Colombia. Así de sencillo:
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
        <div className="mt-14 flex justify-center">
          <a
            href={enlaceWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center rounded-full bg-zinc-900 px-10 text-base font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}

import Header from "./components/Header";

// Nombre de marca provisional — cámbialo cuando lo tengas decidido.
const NOMBRE_MARCA = "Tu Personal Shopper";

// ⚠️ CAMBIAR: número de WhatsApp con código de país, solo dígitos (ej. 57300... o 34600...).
const WHATSAPP_NUMERO = "573000000000";
const WHATSAPP_MENSAJE =
  "¡Hola! Quiero hacer un pedido especial de un producto que no está en el catálogo.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  WHATSAPP_MENSAJE
)}`;

const MARCAS = ["La Roche-Posay", "Eucerin", "Sesderma", "The Ordinary"];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      {/* Encabezado */}
      <Header />

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <span className="mb-6 inline-block rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500">
          Personal shopper · España → Colombia
        </span>

        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
          Tus marcas favoritas de dermocosmética, traídas desde España
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
          Productos originales de alta demanda a mejor precio. Compramos por ti
          en España y te los enviamos a Colombia.
        </p>

        {/* Marcas */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {MARCAS.map((marca) => (
            <span
              key={marca}
              className="rounded-full bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              {marca}
            </span>
          ))}
        </div>

        {/* Botones */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            href="#catalogo"
            className="flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Ver catálogo
          </a>
          <a
            id="pedidos"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-300 px-8 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-900"
          >
            Pedidos especiales por WhatsApp
          </a>
        </div>
      </main>

      {/* Pie */}
      <footer className="w-full border-t border-zinc-100">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-zinc-400">
          © {NOMBRE_MARCA} · Productos originales importados de España
        </div>
      </footer>
    </div>
  );
}

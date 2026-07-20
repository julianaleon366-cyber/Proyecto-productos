import BannerInformativo from "./components/BannerInformativo";
import Header from "./components/Header";
import CarruselProductos, {
  type ProductoDestacado,
} from "./components/CarruselProductos";
import SeccionCollage from "./components/SeccionCollage";
import { SECCIONES } from "./lib/secciones";
import { mensajePedidoEspecial, urlWhatsApp } from "./lib/whatsapp";

// Carrusel destacado (bloque izquierdo): categorías intercaladas para reflejar
// que somos personal shopper integral (no solo skincare) y dar más variedad.
// Orden intercalado: skincare · moda · maquillaje · cabello · (se repite).
const PRODUCTOS_DESTACADOS: ProductoDestacado[] = [
  {
    // Skincare
    nombre: "Skincare y cuidado de la piel",
    descripcion:
      "Marcas de farmacia europea como La Roche-Posay, Bioderma o The Ordinary, a mejor precio.",
    imagen: "/imagenes/4_producto.png",
    href: "#skincare",
    textoBoton: "Ver skincare",
  },
  {
    // Moda (bajo pedido)
    nombre: "¿Buscas zapatos o ropa de España?",
    descripcion:
      "También te los conseguimos bajo pedido. Elige en Zara, Mango o Stradivarius y nosotros te lo traemos.",
    imagen: "/imagenes/1_moda.png",
    href: "/como-funciona",
    textoBoton: "Cómo funciona",
  },
  {
    // Maquillaje
    nombre: "Bases, labiales y más maquillaje",
    descripcion:
      "Descubre nuestra selección de maquillaje de marcas europeas a mejor precio.",
    imagen: "/imagenes/1_maquillaje.png",
    href: "#maquillaje",
    textoBoton: "Ver maquillaje",
  },
  {
    // Cabello
    nombre: "Cuidado capilar profesional",
    descripcion:
      "Champús, mascarillas y tratamientos para nutrir y reparar tu cabello.",
    imagen: "/imagenes/3_cabello.png",
    href: "#capilar",
    textoBoton: "Ver capilar",
  },
  {
    // Suplementos
    nombre: "Suplementos y nutrición deportiva",
    descripcion:
      "Creatina, colágeno y complementos de marcas europeas para tu rendimiento y bienestar.",
    imagen: "/imagenes/1_suplemento.png",
    href: "#suplementos",
    textoBoton: "Ver suplementos",
  },
  {
    // Skincare
    nombre: "Serums, cremas y protección solar",
    descripcion:
      "Rutina completa de cuidado facial: hidratación, tratamiento y protección diaria.",
    imagen: "/imagenes/2_producto.png",
    href: "#skincare",
    textoBoton: "Ver skincare",
  },
  {
    // Moda (bajo pedido)
    nombre: "Complementos y accesorios",
    descripcion:
      "Complementos de tiendas españolas, bajo pedido. Envíanos lo que quieres y te lo cotizamos.",
    imagen: "/imagenes/3_moda.png",
    href: "/como-funciona",
    textoBoton: "Cómo funciona",
  },
  {
    // Maquillaje
    nombre: "Paletas de sombras y rostro",
    descripcion:
      "Tonos y acabados profesionales para tu día a día o eventos especiales.",
    imagen: "/imagenes/2_maquillaje.png",
    href: "#maquillaje",
    textoBoton: "Ver maquillaje",
  },
  {
    // Cabello
    nombre: "Sérums y tratamientos capilares",
    descripcion:
      "Productos específicos para puntas, frizz y brillo, de marcas de farmacia europea.",
    imagen: "/imagenes/2_cabello.png",
    href: "#capilar",
    textoBoton: "Ver capilar",
  },
  {
    // Suplementos
    nombre: "Vitaminas y bienestar articular",
    descripcion:
      "Magnesio, vitamina C, colágeno y más: complementos para tus articulaciones, energía y defensas.",
    imagen: "/imagenes/3_suplemento.png",
    href: "#suplementos",
    textoBoton: "Ver suplementos",
  },
];

// Nombre de marca provisional — cámbialo cuando lo tengas decidido.
const NOMBRE_MARCA = "KAPRICHO";

// Enlace de WhatsApp para el bloque "¿Quieres algo en específico?".
const WHATSAPP_URL = urlWhatsApp(mensajePedidoEspecial());

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      {/* Banner informativo (siempre arriba del todo) */}
      <BannerInformativo />

      {/* Encabezado */}
      <Header />

      {/* Banner promocional a todo el ancho */}
      <main className="w-full px-6 py-10">
        <div className="grid w-full items-stretch gap-4 lg:grid-cols-[2fr_1fr]">
          {/* Bloque grande: carrusel automático de productos destacados */}
          <CarruselProductos productos={PRODUCTOS_DESTACADOS} />

          {/* Bloque pequeño: pedido personalizado con imagen de fondo */}
          <div
            className="relative flex flex-col items-start justify-center overflow-hidden rounded-2xl bg-zinc-100 bg-cover bg-center bg-no-repeat p-8 sm:p-10"
            style={{ backgroundImage: "url('/imagenes/2_imagen.png')" }}
          >
            <h3 className="relative text-2xl font-semibold leading-snug tracking-tight text-zinc-900">
              ¿Quieres algo en específico?
            </h3>
            <p className="relative mt-3 text-sm font-medium uppercase tracking-wide text-zinc-700">
              Te lo traemos desde España
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Personalizar mi pedido
            </a>
          </div>
        </div>
      </main>

      {/* Quiénes somos */}
      <section className="w-full bg-zinc-100 px-6 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
            ¿Quiénes somos?
          </h2>
          <p className="mt-6 text-base leading-7 text-zinc-600">
            En <strong className="font-semibold text-zinc-900">KAPRICHO</strong>{" "}
            somos tu{" "}
            <strong className="font-semibold text-zinc-900">
              personal shopper de confianza en España
            </strong>
            . Compramos por ti productos originales de dermocosmética, maquillaje,
            cuidado capilar, moda y accesorios en tiendas y farmacias europeas, y
            te los{" "}
            <strong className="font-semibold text-zinc-900">
              enviamos directamente a Colombia
            </strong>
            .
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Trabajamos{" "}
            <strong className="font-semibold text-zinc-900">bajo pedido</strong>{" "}
            para ofrecerte siempre producto{" "}
            <strong className="font-semibold text-zinc-900">100% auténtico</strong>{" "}
            a{" "}
            <strong className="font-semibold text-zinc-900">mejor precio</strong>,
            sin intermediarios. Ya sea uno de nuestros productos estrella o algo
            especial que buscas,{" "}
            <strong className="font-semibold text-zinc-900">
              lo conseguimos por ti
            </strong>{" "}
            y te acompañamos en todo el proceso hasta que llega a tus manos.
          </p>
        </div>
      </section>

      {/* Título de las categorías */}
      <section className="w-full px-6 pt-16 pb-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Nuestras categorías
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Descubre lo que podemos traerte desde España
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-600">
          Skincare, maquillaje, cuidado capilar, suplementos, ropa y accesorios
          de marcas europeas. Elige una categoría o pídenos directamente lo que
          buscas.
        </p>
      </section>

      {/* Secciones tipo escaparate: collage + botón WhatsApp por categoría */}
      {SECCIONES.map((seccion, i) => (
        <SeccionCollage
          key={seccion.id}
          seccion={{ ...seccion, fondoGris: i % 2 === 1 }}
        />
      ))}

      {/* Pie: banda "bajo pedido" + redes, todo en un bloque negro de borde a borde */}
      <footer className="mt-8 w-full bg-zinc-900 text-white">
        {/* Sección superior: todo bajo pedido */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 py-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Personal shopper · Todo bajo pedido
          </span>
          <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            ¿Buscas algo de España?
            <br className="hidden sm:block" /> Nosotros te lo conseguimos
          </h2>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Skincare, maquillaje, cuidado capilar, suplementos, ropa y accesorios
            de marcas europeas. Dinos lo que quieres y te lo enviamos directo a
            Colombia.
          </p>
          <a
            href="/como-funciona"
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Ver cómo funciona
          </a>
        </div>

        {/* Separador */}
        <div className="mx-auto max-w-5xl border-t border-white/10" />

        {/* Sección inferior: redes + copyright */}
        <div className="flex w-full flex-col items-center gap-6 px-6 py-10">
          {/* Redes sociales — ⚠️ pon aquí los enlaces reales cuando tengáis las cuentas */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/kapricho.personalshopper"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://facebook.com/kapricho.personalshopper"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com/@kapricho.personalshopper"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 3c.3 2.1 1.5 3.7 3.5 4v2.6c-1.2 0-2.4-.4-3.5-1v6.1a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V3H16Z" />
              </svg>
            </a>
          </div>

          {/* Email de contacto */}
          <a
            href="mailto:kaprichopersonalshopper@gmail.com"
            className="flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
          >
            <svg
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 6 10 7L22 6" />
            </svg>
            kaprichopersonalshopper@gmail.com
          </a>

          <p className="text-center text-sm text-zinc-500">
            © {NOMBRE_MARCA} · Productos originales importados de España
          </p>
        </div>
      </footer>
    </div>
  );
}

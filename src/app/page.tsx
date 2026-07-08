import BannerInformativo from "./components/BannerInformativo";
import Header from "./components/Header";
import CarruselProductos, {
  type ProductoDestacado,
} from "./components/CarruselProductos";
import TarjetaProducto, { type Producto } from "./components/TarjetaProducto";

// Categorías de la tienda. Cada una tiene su propia fila de productos.
type Categoria = {
  id: string;
  titulo: string;
  href: string;
  productos: Producto[];
};

// Catálogo agrupado por secciones. Precios en COP.
// ⚠️ Ajusta estrellas, reseñas y precios a los valores reales.
const CATEGORIAS_CATALOGO: Categoria[] = [
  {
    id: "skincare",
    titulo: "Skincare",
    href: "#skincare",
    productos: [
      {
        id: "cicaplast-b5",
        nombre: "La Roche-Posay Cicaplast Baume B5 SPF 50 (40ml)",
        imagen: "/imagenes/catalogo-cicaplast.jpg",
        estrellas: 4.5,
        resenas: 128,
        precioCop: 79900,
      },
      {
        id: "ordinary-glycolic",
        nombre: "The Ordinary Glycolic Acid 7% Tónico Exfoliante",
        imagen: "/imagenes/catalogo-ordinary.webp",
        estrellas: 4,
        resenas: 86,
        precioCop: 54900,
      },
      {
        id: "bioderma-pigmentbio",
        nombre: "Bioderma Pigmentbio Zonas Sensibles (75ml)",
        imagen: "/imagenes/catalogo-bioderma.jpg",
        estrellas: 5,
        resenas: 42,
        precioCop: 112900,
      },
      {
        id: "sesderma-cvit",
        nombre: "Sesderma C-vit Serum Liposomado (30ml)",
        imagen: "/imagenes/catalogo-sesderma.png",
        estrellas: 4.5,
        resenas: 67,
        precioCop: 89900,
      },
    ],
  },
  {
    id: "maquillaje",
    titulo: "Maquillaje",
    href: "#maquillaje",
    // ⚠️ Productos de ejemplo (inventados) para previsualizar la sección.
    productos: [
      {
        id: "maq-base-fluida",
        nombre: "Base de Maquillaje Fluida Cobertura Media (30ml)",
        imagen: "/imagenes/catalogo-cicaplast.jpg",
        estrellas: 4.5,
        resenas: 95,
        precioCop: 69900,
      },
      {
        id: "maq-labial-mate",
        nombre: "Labial Líquido Mate Larga Duración",
        imagen: "/imagenes/catalogo-ordinary.webp",
        estrellas: 4,
        resenas: 210,
        precioCop: 39900,
      },
      {
        id: "maq-mascara-pestanas",
        nombre: "Máscara de Pestañas Volumen Extremo",
        imagen: "/imagenes/catalogo-bioderma.jpg",
        estrellas: 5,
        resenas: 154,
        precioCop: 45900,
      },
      {
        id: "maq-paleta-sombras",
        nombre: "Paleta de Sombras Tonos Neutros (12 colores)",
        imagen: "/imagenes/catalogo-sesderma.png",
        estrellas: 4.5,
        resenas: 78,
        precioCop: 89900,
      },
    ],
  },
  {
    id: "cabello",
    titulo: "Cabello",
    href: "#cabello",
    // ⚠️ Productos de ejemplo (inventados) para previsualizar la sección.
    productos: [
      {
        id: "cab-champu-reparador",
        nombre: "Champú Reparador Sin Sulfatos (400ml)",
        imagen: "/imagenes/catalogo-bioderma.jpg",
        estrellas: 4.5,
        resenas: 132,
        precioCop: 52900,
      },
      {
        id: "cab-mascarilla-nutritiva",
        nombre: "Mascarilla Capilar Nutritiva Intensiva (250ml)",
        imagen: "/imagenes/catalogo-cicaplast.jpg",
        estrellas: 5,
        resenas: 64,
        precioCop: 61900,
      },
      {
        id: "cab-serum-puntas",
        nombre: "Sérum Anti-frizz para Puntas (50ml)",
        imagen: "/imagenes/catalogo-sesderma.png",
        estrellas: 4,
        resenas: 47,
        precioCop: 43900,
      },
    ],
  },
];

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
    href: "/moda",
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
    imagen: "/imagenes/1_cabello.png",
    href: "#cabello",
    textoBoton: "Ver cabello",
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
    nombre: "Bolsos, gafas y accesorios",
    descripcion:
      "Complementos de tiendas españolas, bajo pedido. Envíanos lo que quieres y te lo cotizamos.",
    imagen: "/imagenes/3_moda.png",
    href: "/moda",
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
    href: "#cabello",
    textoBoton: "Ver cabello",
  },
];

// Nombre de marca provisional — cámbialo cuando lo tengas decidido.
const NOMBRE_MARCA = "KAPRICHO";

// ⚠️ CAMBIAR: número de WhatsApp con código de país, solo dígitos (ej. 57300... o 34600...).
const WHATSAPP_NUMERO = "573000000000";
const WHATSAPP_MENSAJE =
  "¡Hola! Quiero hacer un pedido especial de un producto que no está en el catálogo.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  WHATSAPP_MENSAJE
)}`;

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
              Si no lo tenemos te lo conseguimos
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
          {/* ⚠️ Reemplaza este texto por la descripción real de quiénes sois. */}
          <p className="mt-6 text-base leading-7 text-zinc-600">
            [Aquí va la descripción de quiénes somos. Cuéntalo cuando lo tengas
            listo y lo colocamos aquí.]
          </p>
        </div>
      </section>

      {/* Catálogo de productos, agrupado por categorías */}
      <div id="catalogo" className="w-full px-6 py-16">
        {CATEGORIAS_CATALOGO.filter((cat) => cat.productos.length > 0).map(
          (categoria) => (
            <section
              key={categoria.id}
              id={categoria.id}
              className="mb-16 last:mb-0"
            >
              {/* Cabecera: título a la izquierda, "Ver más" a la derecha */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  {categoria.titulo}
                </h2>
                <a
                  href={categoria.href}
                  className="flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  Ver más
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </div>

              {/* Productos de la categoría */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {categoria.productos.map((producto) => (
                  <TarjetaProducto key={producto.id} producto={producto} />
                ))}
              </div>
            </section>
          )
        )}
      </div>

      {/* Banda: categorías bajo pedido (ropa, zapatos, accesorios) */}
      <section className="w-full px-6 pb-16">
        <div className="flex w-full flex-col items-center gap-6 rounded-2xl bg-zinc-900 px-8 py-14 text-center text-white">
          <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-300">
            También bajo pedido
          </span>
          <h2 className="max-w-2xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            ¿Buscas ropa, zapatos o accesorios de España? También te los
            conseguimos
          </h2>
          <p className="max-w-xl text-sm leading-6 text-zinc-300">
            Ropa, calzado, bolsos y gafas de tiendas españolas como Zara, Mango o
            Stradivarius. Nos envías lo que quieres y te lo cotizamos.
          </p>
          <a
            href="/moda"
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Ver cómo funciona
          </a>
        </div>
      </section>

      {/* Pie */}
      <footer className="w-full border-t border-zinc-100">
        <div className="w-full px-6 py-6 text-center text-sm text-zinc-400">
          © {NOMBRE_MARCA} · Productos originales importados de España
        </div>
      </footer>
    </div>
  );
}

import type { Seccion } from "../components/SeccionCollage";

// Secciones tipo escaparate: collage de ejemplos + botón de WhatsApp.
// ⚠️ Cambia las imágenes por las que mejor representen cada categoría.
export const SECCIONES: Seccion[] = [
  {
    id: "skincare",
    titulo: "Skincare",
    descripcion:
      "Dermocosmética de farmacia europea: La Roche-Posay, Bioderma, The Ordinary, Sesderma y muchas más. Cuéntanos qué buscas y te lo conseguimos.",
    imagenes: [],
    collageUnico: "/imagenes/collage_skincare.png",
    textoBoton: "Pide tu skincare por WhatsApp",
    mensajeWhatsApp:
      "¡Hola KAPRICHO! Me interesa un producto de skincare. ¿Me pueden ayudar?",
  },
  {
    id: "maquillaje",
    titulo: "Beauty",
    descripcion:
      "Marcas europeas como KIKO Milano, NYX y más, a mejor precio. Bases, labiales, paletas, primers… dinos qué quieres y te lo traemos.",
    imagenes: [],
    collageUnico: "/imagenes/collage_maquillaje.png",
    textoBoton: "Pide tu maquillaje por WhatsApp",
    mensajeWhatsApp:
      "¡Hola KAPRICHO! Me interesa un producto de maquillaje. ¿Me pueden ayudar?",
  },
  {
    id: "capilar",
    titulo: "Cuidado capilar",
    descripcion:
      "Cuidado capilar profesional: Olaplex, Kérastase, Moroccanoil y más. Champús, mascarillas y tratamientos para nutrir y reparar tu cabello.",
    imagenes: [],
    collageUnico: "/imagenes/collage_capilar.png",
    textoBoton: "Pide tu producto capilar por WhatsApp",
    mensajeWhatsApp:
      "¡Hola KAPRICHO! Me interesa un producto capilar. ¿Me pueden ayudar?",
  },
  {
    id: "suplementos",
    titulo: "Suplementos nutricionales",
    descripcion:
      "Vitaminas y suplementos de marcas europeas: colágeno, magnesio, omega, creatina y más, para tu bienestar diario.",
    imagenes: [],
    collageUnico: "/imagenes/collage_suplementos.png",
    textoBoton: "Pide tus suplementos por WhatsApp",
    mensajeWhatsApp:
      "¡Hola KAPRICHO! Me interesa un suplemento o vitamina. ¿Me pueden ayudar?",
  },
  {
    id: "ropa",
    titulo: "Ropa y Accesorios",
    descripcion:
      "Conseguimos ropa, calzado y accesorios de marcas como Zara, Stradivarius, Bershka, Pull&Bear y muchas más. Envíanos lo que quieres, en tu talla, y te lo traemos desde España.",
    imagenes: [],
    collageUnico: "/imagenes/collage_moda_definitivo.png",
    textoBoton: "Pide tu prenda por WhatsApp",
    mensajeWhatsApp:
      "¡Hola KAPRICHO! Me interesa una prenda/accesorio de España. Aquí va la captura o el link, la talla y el color:",
  },
];

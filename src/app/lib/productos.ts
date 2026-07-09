// Un tono/variante de color de un producto (ej. los colores de un colorete).
export type Variante = {
  // Nombre del tono (se muestra al seleccionar). Opcional.
  nombre?: string;
  // Color del círculo selector (código hex, ej. "#FF7F6E").
  color: string;
  // Imagen principal del tono. Si el tono tiene galería, es la primera.
  imagen: string;
  // Galería de imágenes del tono (se pasan con flechas). Opcional.
  // Si se define, la primera suele coincidir con `imagen`.
  imagenes?: string[];
  // Sufijo de nombre que se añade al nombre base al elegir este tono.
  // Ej: base "Hydra Lipgloss Kiko Milano" + sufijo "17 Pearly Mauve".
  sufijoNombre?: string;
};

export type Producto = {
  id: string;
  nombre: string;
  imagen: string;
  // Precio en pesos colombianos (COP), sin decimales.
  precioCop: number;
  // Descripción del producto (se muestra en la página de detalle).
  descripcion?: string;
  // Si es "piloto": sin imagen ni datos reales todavía → tarjeta con fondo marcador.
  piloto?: boolean;
  // Galería de fotos del producto (sin tonos). Si existe, el detalle muestra
  // flechas para pasar entre ellas. La primera suele coincidir con `imagen`.
  imagenes?: string[];
  // Tonos/colores disponibles. Si existe, el detalle muestra círculos de color
  // que cambian la imagen. La primera variante es la que se ve por defecto.
  variantes?: Variante[];
};

export type Categoria = {
  id: string;
  titulo: string;
  href: string;
  productos: Producto[];
};

// Todas las categorías con sus productos. Fuente única para la home y el detalle.
export const CATEGORIAS_CATALOGO: Categoria[] = [
  {
    id: "skincare",
    titulo: "Skincare",
    href: "#skincare",
    productos: [
      {
        id: "cicaplast-b5",
        nombre: "La Roche-Posay Cicaplast Baume B5 SPF 50 (40ml)",
        imagen: "/imagenes/catalogo-cicaplast.jpg",
        precioCop: 79900,
        descripcion:
          "El Cicaplast Baume B5 SPF 50 es un bálsamo reparador de La Roche-Posay que ofrece una protección efectiva contra las marcas en la piel, al tiempo que la calma y ayuda a reparar su barrera protectora.\n\nCuenta con protección antimarcas gracias a ingredientes como Procerad y un alto factor de protección solar UVA/UVB SPF 50. Su fórmula incluye Madecasósido para favorecer la recuperación de la piel y un 5% de Pantenol para calmar las zonas secas e irritadas.\n\nTiene una textura agradable, de fácil aplicación, no grasa y no pegajosa, que no deja marcas blancas en la piel. Está enriquecido además con cobre y zinc.\n\nEs ideal para pieles con tatuajes o irritadas después de procedimientos como peelings o láser, y para zonas secas, reactivas o dañadas del día a día.",
      },
      {
        id: "ordinary-glycolic",
        nombre: "The Ordinary Glycolic Acid 7% Tónico Exfoliante",
        imagen: "/imagenes/catalogo-ordinary.webp",
        precioCop: 54900,
        descripcion:
          "El Glycolic Acid 7% Exfoliating Toner es un tónico exfoliante de base acuosa formulado con ácido glicólico al 7%, un alfahidroxiácido (AHA) que ayuda a eliminar las células muertas de la piel, revelando una textura más suave y uniforme.\n\nCon el uso regular favorece una piel más luminosa y radiante, a la vez que ayuda a reducir la visibilidad de las líneas de expresión, las arrugas y otros signos del envejecimiento.\n\nSu fórmula incluye un derivado de pimienta de Tasmania, un extracto vegetal que ayuda a calmar la piel y a reducir la irritación asociada a la exfoliación, por lo que es apto para un uso frecuente. Tiene un pH calibrado de aproximadamente 3,6.\n\nEs un tónico multifuncional: además del rostro, también puede aplicarse en el cuero cabelludo para ayudar a reequilibrar e hidratar. No se recomienda su uso en pieles sensibles, frágiles o descamadas, y conviene usar protección solar tras su aplicación.\n\nConsejo de The Ordinary: aplícalo también para exfoliar pequeñas zonas del cuerpo con piel áspera.",
      },
      {
        id: "bioderma-pigmentbio",
        nombre: "Bioderma Pigmentbio Zonas Sensibles (75ml)",
        imagen: "/imagenes/catalogo-bioderma.jpg",
        precioCop: 112900,
        descripcion:
          "Pigmentbio Zonas Sensibles de Bioderma es un cuidado específico formulado para tratar las áreas propensas a la aparición de manchas, como axilas, ingles, codos o rodillas, donde la fricción puede afectar el tono de la piel. Se integra fácilmente en la rutina diaria de cuidado corporal.\n\nAyuda a reducir la apariencia de las manchas y a prevenir su reaparición con el uso continuado. Gracias a su fórmula, contribuye a unificar el tono de la piel y a mantener una hidratación prolongada durante varias horas.\n\nSu textura se extiende con facilidad, lo que facilita la aplicación en diferentes zonas del cuerpo, y deja una sensación de confort y suavidad tras cada uso.",
      },
      {
        id: "sesderma-cvit",
        nombre: "Sesderma C-vit Serum Liposomado (30ml)",
        imagen: "/imagenes/catalogo-sesderma.png",
        precioCop: 89900,
        descripcion:
          "El C-vit Serum Liposomado de Sesderma es un sérum formulado con vitamina C de máxima actividad antioxidante, hidratante, antiarrugas e iluminadora, que devuelve a tu piel su vitalidad y luz natural.\n\nCombate el fotoenvejecimiento y aporta una inyección de luz a la piel. Su acción antioxidante ayuda a disminuir las arrugas y a aumentar la firmeza. Además, su exclusivo Antiox Booster System favorece la síntesis de colágeno y un tono más uniforme, devolviéndole su luminosidad natural.\n\nPrincipales beneficios:\n\n• Ilumina y revitaliza la piel.\n• Unifica el tono y ayuda a prevenir el fotoenvejecimiento.\n• Combate los signos de fatiga y reduce la aparición de arrugas.\n• Incrementa la firmeza y la elasticidad.\n• Acción antioxidante frente a los radicales libres.\n• Hidratación diaria.\n\nSus principios activos van encapsulados en liposomas para lograr una mayor penetración y eficacia.",
      },
    ],
  },
  {
    id: "maquillaje",
    titulo: "Maquillaje",
    href: "#maquillaje",
    // ⚠️ Productos PILOTO: sin imágenes ni datos reales todavía.
    productos: [
      {
        id: "cooling-water-jelly-tint",
        nombre: "Cooling Water Jelly Tint - Colorete para labios y mejillas",
        imagen: "/imagenes/jelly-tint-1.avif",
        precioCop: 69900,
        descripcion:
          "Stick con color para labios y mejillas de textura gel hidratante, que se desliza sobre la piel y aporta un toque de color translúcido y ajustable que dura todo el día.\n\nFácil de aplicar, se transforma en un acabado radiante tipo acuarela y aguanta sin difuminarse. Su fórmula, enriquecida con colágeno vegano, aloe vera y agua de mar, deja una sensación refrescante y una piel tersa y de aspecto saludable.\n\nVegano: elaborado con ingredientes de origen natural.\n\nDisponible en varios tonos: elige tu color favorito en los círculos de arriba.",
        variantes: [
          { sufijoNombre: "Coral", color: "#FF7F6E", imagen: "/imagenes/jelly-tint-1.avif" },
          { sufijoNombre: "Rosa fuerte", color: "#F94C8D", imagen: "/imagenes/jelly-tint-2.avif" },
          { sufijoNombre: "Rosa", color: "#D9569F", imagen: "/imagenes/jelly-tint-3.avif" },
          { sufijoNombre: "Fucsia", color: "#B93B9E", imagen: "/imagenes/jelly-tint-4.avif" },
          { sufijoNombre: "Naranja", color: "#DC5A1E", imagen: "/imagenes/jelly-tint-5.avif" },
          { sufijoNombre: "Rojo", color: "#D40E0E", imagen: "/imagenes/jelly-tint-6.avif" },
        ],
      },
      {
        id: "hydra-lipgloss-kiko-milano",
        nombre: "Brillo De Labios Emoliente Efecto 3D Hydra Lipgloss Kiko Milano",
        imagen: "/imagenes/kiko-1-1.avif",
        precioCop: 49900,
        descripcion:
          "Brillo de labios de efecto 3D con acabado emoliente y luminoso. Su textura hidratante aporta volumen óptico y un brillo intenso, para unos labios jugosos y cuidados.\n\nDisponible en muchos tonos: elige tu color en los círculos de arriba y desliza las fotos con las flechas para ver cada acabado.",
        variantes: [
          { sufijoNombre: "17 Pearly Mauve", color: "#C0405A", imagen: "/imagenes/kiko-1-1.avif", imagenes: ["/imagenes/kiko-1-1.avif", "/imagenes/kiko-1-2.avif", "/imagenes/kiko-1-3.avif", "/imagenes/kiko-1-4.avif", "/imagenes/kiko-1-5.avif", "/imagenes/kiko-1-6.avif"] },
          { sufijoNombre: "31 Pearly Shell", color: "#E8A9A2", imagen: "/imagenes/kiko-2-1.avif", imagenes: ["/imagenes/kiko-2-1.avif", "/imagenes/kiko-2-2.avif", "/imagenes/kiko-2-3.avif", "/imagenes/kiko-2-4.avif", "/imagenes/kiko-2-5.jpg", "/imagenes/kiko-2-6.avif"] },
          { sufijoNombre: "32 Pearly Natural Rose", color: "#C77B78", imagen: "/imagenes/kiko-3-1.avif", imagenes: ["/imagenes/kiko-3-1.avif", "/imagenes/kiko-3-2.avif", "/imagenes/kiko-3-3.avif", "/imagenes/kiko-3-4.avif", "/imagenes/kiko-3-5.avif"] },
          { sufijoNombre: "35 Pearly Warm Mauve", color: "#B85C5C", imagen: "/imagenes/kiko-4-1.avif", imagenes: ["/imagenes/kiko-4-1.avif", "/imagenes/kiko-4-2.avif", "/imagenes/kiko-4-3.avif", "/imagenes/kiko-4-4.avif", "/imagenes/kiko-4-5.avif"] },
          { sufijoNombre: "11 Golden Red", color: "#D01F2E", imagen: "/imagenes/kiko-5-1.avif", imagenes: ["/imagenes/kiko-5-1.avif", "/imagenes/kiko-5-2.avif", "/imagenes/kiko-5-3.avif", "/imagenes/kiko-5-4.avif", "/imagenes/kiko-5-5.avif", "/imagenes/kiko-5-6.avif"] },
          { sufijoNombre: "22 Sparkling Red Garnet", color: "#9B4A44", imagen: "/imagenes/kiko-6-1.avif", imagenes: ["/imagenes/kiko-6-1.avif", "/imagenes/kiko-6-2.avif", "/imagenes/kiko-6-3.avif", "/imagenes/kiko-6-4.avif", "/imagenes/kiko-6-5.avif", "/imagenes/kiko-6-6.avif"] },
          { sufijoNombre: "23 Magenta", color: "#B01133", imagen: "/imagenes/kiko-7-1.jpg", imagenes: ["/imagenes/kiko-7-1.jpg", "/imagenes/kiko-7-2.avif", "/imagenes/kiko-7-3.avif", "/imagenes/kiko-7-4.avif", "/imagenes/kiko-7-5.jpg", "/imagenes/kiko-7-6.jpg"] },
          { sufijoNombre: "27 Pearly Lavender", color: "#F0C9D0", imagen: "/imagenes/kiko-8-1.avif", imagenes: ["/imagenes/kiko-8-1.avif", "/imagenes/kiko-8-2.avif", "/imagenes/kiko-8-3.avif", "/imagenes/kiko-8-4.avif", "/imagenes/kiko-8-5.avif", "/imagenes/kiko-8-6.avif"] },
          { sufijoNombre: "01 Clear", color: "#F2EEF0", imagen: "/imagenes/kiko-9-1.avif", imagenes: ["/imagenes/kiko-9-1.avif", "/imagenes/kiko-9-2.avif", "/imagenes/kiko-9-3.avif", "/imagenes/kiko-9-4.avif", "/imagenes/kiko-9-5.avif"] },
          { sufijoNombre: "04 Pearly Peach Rose", color: "#E79A94", imagen: "/imagenes/kiko-10-1.avif", imagenes: ["/imagenes/kiko-10-1.avif", "/imagenes/kiko-10-2.avif", "/imagenes/kiko-10-3.avif", "/imagenes/kiko-10-4.avif", "/imagenes/kiko-10-5.avif"] },
          { sufijoNombre: "05 Pearly Pink", color: "#F2A8B0", imagen: "/imagenes/kiko-11-1.avif", imagenes: ["/imagenes/kiko-11-1.avif", "/imagenes/kiko-11-2.avif", "/imagenes/kiko-11-3.avif", "/imagenes/kiko-11-4.avif", "/imagenes/kiko-11-5.avif"] },
          { sufijoNombre: "07 Pink Magnolia", color: "#EF8FA0", imagen: "/imagenes/kiko-12-1.avif", imagenes: ["/imagenes/kiko-12-1.avif", "/imagenes/kiko-12-2.avif", "/imagenes/kiko-12-3.jpg", "/imagenes/kiko-12-4.avif", "/imagenes/kiko-12-5.avif"] },
          { sufijoNombre: "12 Pearly Amaryllis Red", color: "#E85C6A", imagen: "/imagenes/kiko-13-1.avif", imagenes: ["/imagenes/kiko-13-1.avif", "/imagenes/kiko-13-2.avif", "/imagenes/kiko-13-3.avif", "/imagenes/kiko-13-4.avif", "/imagenes/kiko-13-5.avif"] },
          { sufijoNombre: "18 Golden Sparkle", color: "#C96B4E", imagen: "/imagenes/kiko-14-1.avif", imagenes: ["/imagenes/kiko-14-1.avif", "/imagenes/kiko-14-2.avif", "/imagenes/kiko-14-3.avif", "/imagenes/kiko-14-4.avif", "/imagenes/kiko-14-5.avif"] },
          { sufijoNombre: "19 Cream Cashmere", color: "#C77E6E", imagen: "/imagenes/kiko-15-1.avif", imagenes: ["/imagenes/kiko-15-1.avif", "/imagenes/kiko-15-2.avif", "/imagenes/kiko-15-3.avif", "/imagenes/kiko-15-4.avif", "/imagenes/kiko-15-5.avif"] },
          { sufijoNombre: "20 Chestnut", color: "#F0A98F", imagen: "/imagenes/kiko-16-1.avif", imagenes: ["/imagenes/kiko-16-1.avif", "/imagenes/kiko-16-2.avif", "/imagenes/kiko-16-3.avif", "/imagenes/kiko-16-4.avif", "/imagenes/kiko-16-5.jpg"] },
          { sufijoNombre: "26 Sparkling Hibiscus Pink", color: "#EF95A8", imagen: "/imagenes/kiko-17-1.avif", imagenes: ["/imagenes/kiko-17-1.avif", "/imagenes/kiko-17-2.avif", "/imagenes/kiko-17-3.avif", "/imagenes/kiko-17-4.avif", "/imagenes/kiko-17-5.avif"] },
          { sufijoNombre: "21 Brun Rose", color: "#B57B7B", imagen: "/imagenes/kiko-18-1.avif", imagenes: ["/imagenes/kiko-18-1.avif", "/imagenes/kiko-18-2.avif", "/imagenes/kiko-18-3.avif", "/imagenes/kiko-18-4.avif"] },
          { sufijoNombre: "10 Sparkling Strawberry", color: "#E23D5C", imagen: "/imagenes/kiko-19-1.avif", imagenes: ["/imagenes/kiko-19-1.avif", "/imagenes/kiko-19-2.avif", "/imagenes/kiko-19-3.avif", "/imagenes/kiko-19-4.avif", "/imagenes/kiko-19-5.avif", "/imagenes/kiko-19-6.avif"] },
        ],
      },
      {
        id: "nyx-face-glue-primer",
        nombre: "NYX Professional Makeup - The Face Glue Primer",
        imagen: "/imagenes/nyx-glue-1.webp",
        imagenes: ["/imagenes/nyx-glue-1.webp", "/imagenes/nyx-glue-2.avif"],
        precioCop: 54900,
        descripcion:
          "Prebase fijadora que mantiene el maquillaje intacto hasta 24 horas. Actúa como un adhesivo, pero sin sensación pegajosa: desde la base hasta el colorete, todo queda fijado con un acabado uniforme y duradero.\n\nAdemás de prolongar la duración del maquillaje, hidrata la piel durante todo el día gracias al ácido poliglutámico y el jarabe de arce. Su textura es ligera y no comedogénica, con un efecto de enfoque suave que no obstruye los poros.\n\nCon esta prebase, tu look se mantiene impecable por más tiempo.",
      },
    ],
  },
  {
    id: "cabello",
    titulo: "Cabello",
    href: "#cabello",
    // ⚠️ Productos PILOTO: sin imágenes ni datos reales todavía.
    productos: [
      {
        id: "cab-piloto-1",
        nombre: "Producto capilar 1",
        imagen: "",
        precioCop: 52900,
        descripcion:
          "Descripción piloto del producto capilar. Aquí irá la descripción real cuando tengamos el producto.",
        piloto: true,
      },
      {
        id: "cab-piloto-2",
        nombre: "Producto capilar 2",
        imagen: "",
        precioCop: 61900,
        descripcion: "Descripción piloto del producto capilar.",
        piloto: true,
      },
      {
        id: "cab-piloto-3",
        nombre: "Producto capilar 3",
        imagen: "",
        precioCop: 43900,
        descripcion: "Descripción piloto del producto capilar.",
        piloto: true,
      },
    ],
  },
  {
    id: "suplementos",
    titulo: "Suplementos",
    href: "#suplementos",
    // ⚠️ Productos PILOTO: sin imágenes ni datos reales todavía.
    productos: [
      {
        id: "creatine-monohydrate-creapure",
        nombre: "Creatine Monohydrate (Creapure®) en polvo",
        imagen: "/imagenes/creatine-creapure.jpg",
        precioCop: 129900,
        descripcion:
          "La creatina es uno de los suplementos más estudiados y utilizados por deportistas: al aumentar su concentración en el músculo, ayuda a mejorar el rendimiento físico en series sucesivas de ejercicios breves y de alta intensidad. Por eso es ideal para el entrenamiento de fuerza y el deporte de alto rendimiento.\n\nEstá elaborado con creatina monohidrato Creapure®, una de las materias primas de mayor calidad del mercado, reconocida por su pureza gracias a una cuidadosa selección de ingredientes, procesos tecnológicos avanzados bajo condiciones GMP y estrictos métodos de análisis.\n\nModo de uso recomendado: una ingesta diaria de 3 g de creatina mejora el rendimiento físico en series sucesivas de ejercicios breves de alta intensidad.",
      },
      {
        id: "colnatur-complex-neutro",
        nombre: "Colnatur Complex Sabor Neutro 324g",
        imagen: "/imagenes/colnatur-complex.jpg",
        precioCop: 99900,
        descripcion:
          "Colnatur Complex es un colágeno natural asimilable puro con vitamina C, magnesio, cobre y ácido hialurónico, indicado para el cuidado de las articulaciones, los huesos y los músculos.\n\nComplemento alimenticio en polvo. 324 g.\n\nSabor muy neutro.",
      },
      {
        id: "solaray-magnesium-bisglycinate",
        nombre: "Solaray Magnesium Bisglycinate 120 Cápsulas",
        imagen: "/imagenes/solaray-magnesium.jpg",
        precioCop: 89900,
        descripcion:
          "Magnesio en forma de bisglicinato, una versión quelada que el cuerpo absorbe mejor que otras sales de magnesio. Un mineral esencial para el bienestar diario.\n\nBeneficios principales:\n\n• Salud de huesos y músculos: ayuda a mantener niveles normales de magnesio, favoreciendo la densidad ósea y la función muscular.\n\n• Relajación muscular: contribuye a aliviar la tensión y los espasmos, y ayuda a descansar mejor.\n\n• Equilibrio psicológico: apoya el funcionamiento normal del sistema nervioso, ayudando a manejar el estrés y el estado de ánimo.\n\nCada cápsula aporta bisglicinato de magnesio junto con Bioperine® (extracto de pimienta negra) que mejora su absorción. Complemento alimenticio. 120 cápsulas.",
      },
      {
        id: "kal-glucosamine-chondroitin-msm",
        nombre: "Kal Glucosamine Chondroitin MSM 90 Comprimidos",
        imagen: "/imagenes/kal-glucosamine.jpg",
        precioCop: 109900,
        descripcion:
          "Complemento a base de glucosamina y condroitina que favorece la función y la movilidad de las articulaciones. Ideal a partir de los 45 años, para deportistas o personas con molestias articulares.\n\nSu fórmula combina:\n\n• Glucosamina: ayuda a aliviar el dolor y a cuidar el cartílago.\n\n• Condroitina: componente básico del cartílago; retrasa su desgaste y, junto a la glucosamina, mejora la movilidad.\n\n• MSM (metilsulfonilmetano): contribuye al bienestar articular.\n\n• Vitamina C y calcio: favorecen la absorción de los nutrientes y el cuidado de los huesos.\n\nComplemento alimenticio. 90 comprimidos. Modo de uso: 3 comprimidos al día con la comida.",
      },
      {
        id: "solgar-ester-c-plus-1000",
        nombre: "Solgar Ester-C Plus 1000mg 60 Comprimidos",
        imagen: "/imagenes/solgar-ester-c.avif",
        precioCop: 119900,
        descripcion:
          "Vitamina C en su forma Ester-C®, suave con el estómago y de fácil absorción, para reforzar tus defensas y cuidar tu piel desde dentro.\n\nBeneficios principales:\n\n• Fortalece el sistema inmunitario.\n\n• Favorece la formación de colágeno para una piel más sana.\n\n• Protege las células del estrés oxidativo y mejora la absorción de hierro.\n\nCada comprimido aporta 1000 mg de vitamina C, junto con acerola, bioflavonoides cítricos, rutina y escaramujo, que potencian su efecto. Complemento alimenticio. 60 comprimidos. Modo de uso: 1 comprimido al día, preferiblemente con una comida.",
      },
      {
        id: "aceite-krill-nko",
        nombre: "Aceite de Krill NKO 80 Perlas",
        imagen: "/imagenes/aceite-krill.webp",
        precioCop: 139900,
        descripcion:
          "Aceite de krill NKO de alta calidad y pureza, rico en omega-3 (EPA y DHA) de cadena larga. Sus fosfolípidos naturales mejoran la absorción y aprovechamiento del omega-3.\n\nCaracterísticas:\n\n• Gran aporte de EPA y DHA.\n\n• Fácil digestión y buena absorción.\n\n• Sin olor ni regusto.\n\nIndicado para adultos y mayores de 12 años. Contiene gelatina de pescado; puede contener trazas de crustáceos. Complemento alimenticio. 80 perlas.\n\nModo de uso: mantenimiento, 1-2 cápsulas al día con las comidas; refuerzo, 3-5 al día.",
      },
    ],
  },
];

// Devuelve una categoría por su id.
export function buscarCategoria(id: string): Categoria | undefined {
  return CATEGORIAS_CATALOGO.find((cat) => cat.id === id);
}

// Devuelve un producto por su id (busca en todas las categorías).
export function buscarProducto(id: string): Producto | undefined {
  for (const cat of CATEGORIAS_CATALOGO) {
    const p = cat.productos.find((prod) => prod.id === id);
    if (p) return p;
  }
  return undefined;
}

// Todos los productos en una sola lista (sin los piloto sin nombre real).
export function todosLosProductos(): Producto[] {
  return CATEGORIAS_CATALOGO.flatMap((cat) => cat.productos);
}

// Quita tildes y pasa a minúsculas para comparar sin acentos.
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Distancia de Levenshtein: nº de ediciones (cambiar/añadir/quitar letra) entre dos palabras.
function distancia(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let fila = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = fila[0];
    fila[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = fila[j];
      fila[j] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, fila[j], fila[j - 1]);
      prev = temp;
    }
  }
  return fila[n];
}

// ¿La palabra buscada coincide (exacta, contenida o "parecida") con alguna del texto?
function palabraCoincide(buscada: string, palabrasTexto: string[]): boolean {
  return palabrasTexto.some((palabra) => {
    // Coincidencia directa: lo que el cliente escribe debe estar contenido en
    // la palabra del producto ("cica" → "cicaplast"). Solo si lo buscado tiene
    // al menos 3 letras, para no cazar con cualquier trocito ("a", "de"...).
    // OJO: solo en este sentido. Comprobar si la palabra del producto está
    // contenida en lo buscado haría que "hola" cazara "la" (de "La Roche").
    if (buscada.length >= 3 && palabra.includes(buscada)) return true;

    // Coincidencia aproximada (tolerante a erratas) SOLO para palabras largas
    // (≥6 letras): así "cicaplas" encuentra "cicaplast", pero palabras cortas
    // y comunes como "hola" no se parecen a nada por accidente.
    if (buscada.length < 6) return false;
    // Permite 1 errata; 2 solo en palabras muy largas (≥9 letras).
    const umbral = buscada.length >= 9 ? 2 : 1;
    // Solo compara palabras de longitud parecida (evita coincidencias al azar).
    if (Math.abs(palabra.length - buscada.length) > umbral) return false;
    return distancia(buscada, palabra) <= umbral;
  });
}

// Busca productos que coincidan con TODAS las palabras del término.
// La coincidencia difusa (tolerante a errores) se aplica al NOMBRE; en la
// descripción solo cuenta la coincidencia exacta o contenida, para no llenar
// de resultados irrelevantes cuando el usuario escribe cualquier cosa.
export function buscarProductos(termino: string): Producto[] {
  const palabrasBuscadas = normalizar(termino).split(/\s+/).filter(Boolean);
  if (palabrasBuscadas.length === 0) return [];

  // Coincidencia difusa (con tolerancia a errores).
  const coincideFuzzy = (campo: string, buscada: string) =>
    palabraCoincide(buscada, campo.split(/[^a-z0-9]+/).filter(Boolean));

  // Coincidencia estricta (fragmento contenido, sin errores).
  const contiene = (campo: string, buscada: string) => campo.includes(buscada);

  const resultados = todosLosProductos().map((p) => {
    const nombre = normalizar(p.nombre);
    const descripcion = normalizar(p.descripcion ?? "");

    // Cuenta coincidencias en el nombre, para ordenar por relevancia.
    const enNombre = palabrasBuscadas.filter((b) =>
      coincideFuzzy(nombre, b)
    ).length;

    // Entra si CADA palabra coincide de forma difusa en el nombre,
    // o de forma exacta/contenida en la descripción.
    const todasCoinciden = palabrasBuscadas.every(
      (b) => coincideFuzzy(nombre, b) || contiene(descripcion, b)
    );

    return { producto: p, enNombre, todasCoinciden };
  });

  return resultados
    .filter((r) => r.todasCoinciden)
    .sort((a, b) => b.enNombre - a.enNombre)
    .map((r) => r.producto);
}

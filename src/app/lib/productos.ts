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
      {
        // ⚠️ PILOTO para previsualizar el "Ver más".
        id: "sk-piloto-1",
        nombre: "Producto skincare 5",
        imagen: "",
        precioCop: 64900,
        descripcion: "Descripción piloto del producto de skincare.",
        piloto: true,
      },
      {
        id: "sk-piloto-2",
        nombre: "Producto skincare 6",
        imagen: "",
        precioCop: 74900,
        descripcion: "Descripción piloto del producto de skincare.",
        piloto: true,
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
        id: "maq-piloto-1",
        nombre: "Producto de maquillaje 1",
        imagen: "",
        precioCop: 69900,
        descripcion:
          "Descripción piloto del producto de maquillaje. Aquí irá la descripción real cuando tengamos el producto.",
        piloto: true,
      },
      {
        id: "maq-piloto-2",
        nombre: "Producto de maquillaje 2",
        imagen: "",
        precioCop: 39900,
        descripcion: "Descripción piloto del producto de maquillaje.",
        piloto: true,
      },
      {
        id: "maq-piloto-3",
        nombre: "Producto de maquillaje 3",
        imagen: "",
        precioCop: 45900,
        descripcion: "Descripción piloto del producto de maquillaje.",
        piloto: true,
      },
      {
        id: "maq-piloto-4",
        nombre: "Producto de maquillaje 4",
        imagen: "",
        precioCop: 89900,
        descripcion: "Descripción piloto del producto de maquillaje.",
        piloto: true,
      },
      {
        id: "maq-piloto-5",
        nombre: "Producto de maquillaje 5",
        imagen: "",
        precioCop: 55900,
        descripcion: "Descripción piloto del producto de maquillaje.",
        piloto: true,
      },
      {
        id: "maq-piloto-6",
        nombre: "Producto de maquillaje 6",
        imagen: "",
        precioCop: 42900,
        descripcion: "Descripción piloto del producto de maquillaje.",
        piloto: true,
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
        id: "sup-piloto-3",
        nombre: "Suplemento 3",
        imagen: "",
        precioCop: 59900,
        descripcion: "Descripción piloto del suplemento.",
        piloto: true,
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

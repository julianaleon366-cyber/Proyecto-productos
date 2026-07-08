// Configuración central de WhatsApp para KAPRICHO.
// Número español (+34).
export const WHATSAPP_NUMERO = "34624396823";

export type ItemBolsa = {
  id: string;
  nombre: string;
  precioCop: number;
  cantidad: number;
};

const formateadorCop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

// Construye una URL de WhatsApp con un mensaje predefinido.
export function urlWhatsApp(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

// Mensaje para cotizar toda la bolsa (resumen de productos + total estimado).
export function mensajeCotizarBolsa(items: ItemBolsa[]) {
  if (items.length === 0) {
    return "¡Hola KAPRICHO! Quiero hacer un pedido.";
  }

  const lineas = items.map(
    (i) =>
      `• ${i.nombre} x${i.cantidad} — ${formateadorCop.format(
        i.precioCop * i.cantidad
      )}`
  );
  const total = items.reduce((s, i) => s + i.precioCop * i.cantidad, 0);

  return [
    "¡Hola KAPRICHO! Me interesa este pedido y quiero confirmar disponibilidad:",
    "",
    ...lineas,
    "",
    `Total estimado: ${formateadorCop.format(total)}`,
  ].join("\n");
}

// Mensaje para un pedido especial (producto que no está en el catálogo).
export function mensajePedidoEspecial() {
  return "¡Hola KAPRICHO! Quiero hacer un pedido especial de un producto que no está en el catálogo.";
}

// Mensaje para cotizar una prenda/accesorio bajo pedido (moda, zapatos, accesorios).
export function mensajeModaBajoPedido() {
  return "¡Hola KAPRICHO! Me interesa una prenda/accesorio de España. Aquí va la captura o el link, la talla y el color:";
}

export default function BannerInformativo() {
  return (
    <div className="w-full bg-zinc-900 px-6 py-2 text-center">
      <p className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-white sm:text-sm">
        Envíos directos desde España a toda Colombia
        {/* Avioncito en blanco dibujado a mano */}
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V8.5l-8 5v2l8-2.5V17l-2 1.5v1.5l3.5-1 3.5 1V18.5L13 17v-3.5l8 2.5Z" />
        </svg>
        · Producto europeo 100% original
      </p>
    </div>
  );
}

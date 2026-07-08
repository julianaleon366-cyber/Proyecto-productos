"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ItemBolsa } from "./whatsapp";

type BolsaContextValor = {
  items: ItemBolsa[];
  totalUnidades: number;
  agregar: (item: Omit<ItemBolsa, "cantidad">) => void;
  quitar: (id: string) => void;
  vaciar: () => void;
};

const BolsaContext = createContext<BolsaContextValor | null>(null);

const CLAVE_STORAGE = "kapricho-bolsa";

export function BolsaProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemBolsa[]>([]);

  // Cargar la bolsa guardada al montar.
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // Si falla la lectura, empezamos con la bolsa vacía.
    }
  }, []);

  // Guardar cada cambio.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch {
      // Ignoramos errores de escritura (ej. almacenamiento lleno).
    }
  }, [items]);

  function agregar(item: Omit<ItemBolsa, "cantidad">) {
    setItems((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
  }

  function quitar(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function vaciar() {
    setItems([]);
  }

  const totalUnidades = items.reduce((s, i) => s + i.cantidad, 0);

  return (
    <BolsaContext.Provider
      value={{ items, totalUnidades, agregar, quitar, vaciar }}
    >
      {children}
    </BolsaContext.Provider>
  );
}

export function useBolsa() {
  const ctx = useContext(BolsaContext);
  if (!ctx) {
    throw new Error("useBolsa debe usarse dentro de <BolsaProvider>");
  }
  return ctx;
}

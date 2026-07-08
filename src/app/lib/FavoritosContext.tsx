"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FavoritosContextValor = {
  ids: string[];
  total: number;
  esFavorito: (id: string) => boolean;
  alternar: (id: string) => void;
};

const FavoritosContext = createContext<FavoritosContextValor | null>(null);

const CLAVE_STORAGE = "kapricho-favoritos";

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      if (guardado) setIds(JSON.parse(guardado));
    } catch {
      // Bolsa/favoritos vacíos si falla la lectura.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(ids));
    } catch {
      // Ignoramos errores de escritura.
    }
  }, [ids]);

  function esFavorito(id: string) {
    return ids.includes(id);
  }

  function alternar(id: string) {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <FavoritosContext.Provider
      value={{ ids, total: ids.length, esFavorito, alternar }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const ctx = useContext(FavoritosContext);
  if (!ctx) {
    throw new Error("useFavoritos debe usarse dentro de <FavoritosProvider>");
  }
  return ctx;
}

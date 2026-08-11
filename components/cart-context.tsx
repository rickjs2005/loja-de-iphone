"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";
import type { CartItem } from "@/lib/whatsapp";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, openDrawer?: boolean) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  selected: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "loja-de-iphone:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const hydrated = useRef(false);

  // rehidrata o carrinho entre visitas
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: { id: string; qty: number }[] = JSON.parse(raw);
        const restored = saved
          .map(({ id, qty }) => {
            const product = products.find((p) => p.id === id);
            return product ? { product, qty: Math.max(1, qty) } : null;
          })
          .filter((i): i is CartItem => i !== null);
        if (restored.length) setItems(restored);
      }
    } catch {
      // storage indisponível — segue sem persistência
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items.map(({ product, qty }) => ({ id: product.id, qty }))),
      );
    } catch {
      // ignora
    }
  }, [items]);

  // trava o scroll da página quando drawer ou modal estão abertos
  useEffect(() => {
    const locked = isCartOpen || selected !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen, selected]);

  const addItem = useCallback((product: Product, openDrawer = false) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    if (openDrawer) {
      setSelected(null);
      setCartOpen(true);
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    return {
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      setQty,
      clear,
      isCartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      selected,
      openProduct: (product) => setSelected(product),
      closeProduct: () => setSelected(null),
    };
  }, [items, isCartOpen, selected, addItem, removeItem, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}

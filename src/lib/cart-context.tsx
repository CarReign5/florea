"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "florea-cart";

function readStoredCart(): CartItem[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore unavailable storage
  }
}

type Listener = () => void;
const listeners = new Set<Listener>();
const EMPTY_CART: CartItem[] = [];
let cachedItems: CartItem[] | null = null;

function getSnapshot(): CartItem[] {
  if (cachedItems === null) cachedItems = readStoredCart();
  return cachedItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setCart(updater: (prev: CartItem[]) => CartItem[]) {
  cachedItems = updater(getSnapshot());
  writeStoredCart(cachedItems);
  listeners.forEach((listener) => listener());
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    return {
      items,
      addItem: (item) =>
        setCart((prev) => [
          ...prev,
          {
            ...item,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          },
        ]),
      removeItem: (id) =>
        setCart((prev) => prev.filter((item) => item.id !== id)),
      updateQuantity: (id, quantity) =>
        setCart((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        ),
      clear: () => setCart(() => []),
      count,
      subtotal,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

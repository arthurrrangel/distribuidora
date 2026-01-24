// src/contexts/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: string; // ID da variante
  productId: string; // ID do produto pai
  handle: string;
  title: string;
  price: number;
  originalPrice?: number;
  image?: string;
  quantity: number;
  unit?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Carregar do localStorage (Apenas no Cliente)
  useEffect(() => {
    // Se não estiver no navegador, não faz nada
    if (typeof window === "undefined") return;

    const savedCart = localStorage.getItem("arel_cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(parsedCart);
      } catch (e) {
        console.error("Erro ao ler carrinho:", e);
        localStorage.removeItem("arel_cart");
      }
    }

    setIsLoading(false);
  }, []); // Executa apenas na montagem

  // 2. Salvar no localStorage sempre que 'items' mudar
  useEffect(() => {
    // Só salvamos se o carregamento inicial já tiver terminado (isLoading = false)
    if (!isLoading && typeof window !== "undefined") {
      localStorage.setItem("arel_cart", JSON.stringify(items));
    }
  }, [items, isLoading]);

  const addItem = (product: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id,
      );

      if (existingItemIndex > -1) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}

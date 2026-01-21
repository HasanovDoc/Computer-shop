import { create } from 'zustand';
import type { CartItem } from '../types';

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  add: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  remove: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clear: () => set({ items: [] }),
}));

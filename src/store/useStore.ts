import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface AppStore {
  cart: CartItem[];
  wishlist: string[];
  user: User;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  clearCart: () => void;
  setUser: (user: Partial<User>) => void;
  logout: () => void;
}


export const useStore = create<AppStore>((set) => ({
  cart: [],
  wishlist: [],
  user: {
    name: '',
    email: '',
    isLoggedIn: false
  },
  addToCart: (item) => set((state) => {
    const existing = state.cart.find((i) => i.id === item.id && i.size === item.size);
    if (existing) {
      return {
        cart: state.cart.map((i) => 
          (i.id === item.id && i.size === item.size) 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        )
      };
    }
    return { cart: [...state.cart, item] };
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((i) => i.id !== id)
  })),
  toggleWishlist: (id) => set((state) => ({
    wishlist: state.wishlist.includes(id)
      ? state.wishlist.filter((i) => i !== id)
      : [...state.wishlist, id]
  })),
  clearCart: () => set({ cart: [] }),
  setUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData, isLoggedIn: true }
  })),
  logout: () => set({
    user: { name: '', email: '', isLoggedIn: false }
  }),
}));


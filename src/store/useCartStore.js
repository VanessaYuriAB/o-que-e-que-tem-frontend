import { create } from 'zustand';
import { addItemToCart, removeItemToCart } from '../features/cart/services/cartService.js';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      loading: false,

      // addItem chama cartService.addItemToCard
      addItemToCartAction: async (item) => {
        set({ loading: true });

        try {
          const alreadyExists = get().cartItems.some(
            (cartItem) => cartItem.productName === item.productName
          );

          if (alreadyExists) return;

          await addItemToCart(item);
          set((state) => ({
            cartItems: [...state.cartItems, item],
          }));
        } finally {
          set({ loading: false });
        }
      },

      // removeItem chama cartService.removeItemToCard
      removeItemToCartAction: async (item) => {
        set({ loading: true });

        try {
          await removeItemToCart(item);
          set((state) => ({
            cartItems: state.cartItems.filter(
              (cardItem) => item.productName !== cardItem.productName
            ),
          }));
        } finally {
          set({ loading: false });
        }
      },

      // cleanCartItems limpa estado
      cleanCartItemsAction: () => {
        set(() => ({
          cartItems: [],
        }));
      },
    }),
    {
      name: 'cartData',
    }
  )
);

export default useCartStore;

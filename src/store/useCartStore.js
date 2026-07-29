import { create } from 'zustand';
import {
  addItemToCart,
  removeItemToCart,
  setPackData,
} from '../features/cart/services/cartService.js';
import { persist } from 'zustand/middleware';
/*import errorHandler from '../shared/utils/errorHandler.js';*/

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartPacks: [],

      loading: false, // add e send (componentes diferentes)
      globalError: null,

      removeLoading: false, // Cart
      setLoading: false, // Cart

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
        set({ removeLoading: true });

        try {
          await removeItemToCart(item);
          set((state) => ({
            cartItems: state.cartItems.filter(
              (cardItem) => item.productName !== cardItem.productName
            ),
          }));
        } finally {
          set({ removeLoading: false });
        }
      },

      // setPackData chama cartService.setPackData
      setPackDataAction: async (pack) => {
        set({ setLoading: true });

        try {
          /* verificar se pack já existe

          const alreadyExists = get().cartPacks.some(
            (cartPack) => cartPack.productName === pack.productName
          );

          if (alreadyExists) return;*/

          await setPackData(pack);
          set((state) => ({
            cartPacks: [...state.cartPacks, pack],
          }));
        } finally {
          set({ setLoading: false });
        }
      },

      // sendOrder chama checkoutService.sendOrderToServer
      /*sendOrderToServerAction: async (order) => {
        set({ loading: true, globalError: null });

        try {
          await sendOrderToServer(order);
          return { success: true };
        } catch (error) {
          const handledError = errorHandler(error);

          if (handledError.scope === 'global') {
            set({ globalError: handledError });
          }

          return { success: false, error: handledError };
        } finally {
          set({ loading: false });
        }
      },*/

      // cleanCart limpa estado + persistência
      cleanCartAction: () => {
        set(() => ({
          cartItems: [],
          cartPacks: [],
        }));
      },
    }),

    {
      name: 'cartData',

      partialize: (state) => ({
        cartItems: state.cartItems,
        cartPacks: state.cartPacks,
      }),
    }
  )
);

export default useCartStore;

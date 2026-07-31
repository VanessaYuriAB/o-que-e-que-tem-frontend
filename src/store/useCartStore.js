import { create } from 'zustand';
import {
  addItemToCart,
  removeItemToCart,
  setCartData,
} from '../features/cart/services/cartService.js';
import { persist } from 'zustand/middleware';
import errorHandler from '../shared/utils/errorHandler.js';
import sendOrderToServer from '../features/checkout/services/checkoutService.js';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartData: {},

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

      // setCartData chama cartService.setCartData
      setCartDataAction: async (data) => {
        set({ setLoading: true });

        try {
          await setCartData(data);
          set(() => ({
            cartData: data,
          }));
        } finally {
          set({ setLoading: false });
        }
      },

      // sendOrder chama checkoutService.sendOrderToServer
      sendOrderToServerAction: async (order) => {
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
      },

      // cleanCart limpa estado + persistência
      cleanCartAction: () => {
        set(() => ({
          cartItems: [],
          cartData: {},
        }));
      },
    }),

    {
      name: 'cartData',

      partialize: (state) => ({
        cartItems: state.cartItems,
        cartData: state.cartData,
      }),
    }
  )
);

export default useCartStore;

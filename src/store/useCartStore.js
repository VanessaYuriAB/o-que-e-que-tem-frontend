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
      addItemToCartAction: async (item, userId) => {
        set({ loading: true });

        try {
          if (userId) {
            // Atualiza o nome da chave, no Zustand
            useCartStore.persist.setOptions({
              name: `cartData-${userId}`,
            });

            // E recarrega (atualiza a persistência pelo Zustand)
            await useCartStore.persist.rehydrate();
          }

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
          const dataToStorage = await sendOrderToServer(order);
          return { success: true, data: dataToStorage };
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
      cleanCartAction: (userId) => {
        if (userId) {
          // Remove persistência para carrinho do usuário
          localStorage.removeItem(`cartData-${userId}`);
        }

        set(() => ({
          cartItems: [],
          cartData: {},
        }));
      },

      // syncCartStorage configura persistência dinâmica do carrinho, por usuário
      syncCartStorageAction: async (userId) => {
        // Configura nome da chave (padrão ou id)
        const storageUserCart = userId ? `cartData-${userId}` : 'cartData-user';

        // Atualiza o nome da chave, no Zustand
        useCartStore.persist.setOptions({
          name: storageUserCart,
        });

        // E recarrega os dados salvos, no Zustand (atualiza a persistência)
        await useCartStore.persist.rehydrate();
      },

      // migrateAnonymousCartAction configura persistência padrão do carrinho, para persistência do usuário que logou, caso tenha adicionado itens quando deslogado
      migrateAnonymousCartAction: async (userId) => {
        // Recupera dados salvos na chave padrão
        const anonymousCart = localStorage.getItem('cartData-user');

        // Se não houver itens adicionados, retorna
        if (!anonymousCart) return;

        // Se houver itens no carrinho padrão
        // Atualiza o nome da chave com base no ID do usuário
        useCartStore.persist.setOptions({
          name: `cartData-${userId}`,
        });

        // Mantém items, transferindo-os para a persistência do usuário logado
        localStorage.setItem(`cartData-${userId}`, anonymousCart);

        // Remove persistência para carrinho padrão
        localStorage.removeItem('cartData-user');

        // E recarrega os dados salvos, no Zustand
        await useCartStore.persist.rehydrate();
      },

      // resetToAnonymousCartAction configura persisitência padrão vazia, sem apagar persistência de usuário logado, para logout
      resetToAnonymousCartAction: async () => {
        set({
          cartItems: [],
          cartData: {},
        });

        useCartStore.persist.setOptions({
          name: 'cartData-user',
        });

        await useCartStore.persist.rehydrate();
      },
    }),

    {
      name: 'cartData-user', // nome inicial padrão antes do login

      partialize: (state) => ({
        cartItems: state.cartItems,
        cartData: state.cartData,
      }),
    }
  )
);

export default useCartStore;

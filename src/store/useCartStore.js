import { create } from 'zustand';
import {
  addItemToCart,
  removeItemToCart,
  setCartData,
} from '../features/cart/services/cartService.js';
import { persist } from 'zustand/middleware';
import errorHandler from '../shared/utils/errorHandler.js';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartData: {},

      loading: false, // add (MenuTypes)

      removeLoading: false, // remove (MenuTypes e Cart)
      setLoading: false, // setCart (Cart)

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
        } catch (error) {
          throw errorHandler(error);
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
        } catch (error) {
          throw errorHandler(error);
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
        } catch (error) {
          throw errorHandler(error);
        } finally {
          set({ setLoading: false });
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

      // syncCartStorage configura persistência dinâmica do carrinho, por usuário (caso esteja logado), para refresh
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

      // migrateAnonymousCartAction configura a troca de persistência padrão do carrinho, para persistência do usuário, ao logar
      migrateAnonymousCartAction: async (userId) => {
        // Verifica chave padrão
        const anonymousCartRaw = localStorage.getItem('cartData-user');
        const anonymousCart = anonymousCartRaw ? JSON.parse(anonymousCartRaw) : null;
        const hasAnonymousItems = anonymousCart?.state?.cartItems?.length > 0;

        // Verifica chave de usuário
        const userCartRaw = localStorage.getItem(`cartData-${userId}`);
        const userCart = userCartRaw ? JSON.parse(userCartRaw) : null;
        const hasUserItems = userCart?.state?.cartItems?.length > 0;

        // Atualiza o nome da chave com base no ID do usuário
        useCartStore.persist.setOptions({
          name: `cartData-${userId}`,
        });

        if (!hasAnonymousItems && hasUserItems) {
          // Se não houver itens no padrão e houver no do usuário
          localStorage.setItem(`cartData-${userId}`, userCartRaw);
        } else if (hasAnonymousItems && !hasUserItems) {
          // Se houver itens no padrão e não houver no do usuário
          localStorage.setItem(`cartData-${userId}`, anonymousCartRaw);
        } else if (hasAnonymousItems && hasUserItems) {
          // Se houver itens em ambos
          const merged = [...userCart.state.cartItems, ...anonymousCart.state.cartItems];
          const mergedMap = new Map(merged.map((item) => [item._id, item]));
          const uniqueMergedCart = [...mergedMap.values()];

          set(() => ({
            cartItems: uniqueMergedCart,
          }));
        }

        // Se não houver itens em ambos, apenas configura a chave do usuário, remove a padrão e reidrata Zustand

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

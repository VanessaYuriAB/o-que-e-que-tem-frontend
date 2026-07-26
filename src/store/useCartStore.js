import { create } from 'zustand';
import { addItemToCart, removeItemToCart } from '../features/cart/services/cartService.js';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      // addItem chama cartService.addItemToCard
      addItemToCartAction: async (item) => {
        await addItemToCart(item);
        set((state) => ({
          cartItems: [...state.cartItems, item],
        }));
      },

      // removeItem chama cartService.removeItemToCard
      removeItemToCartAction: async (item) => {
        await removeItemToCart(item);
        set((state) => ({
          cartItems: state.cartItems.filter(
            (cardItem) => item.productName !== cardItem.productName
          ),
        }));
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

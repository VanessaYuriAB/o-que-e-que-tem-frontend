import { create } from 'zustand';
import * as authService from '../features/auth/services/authService.js';
import errorHandler from '../shared/utils/errorHandler';

/*

- return { success: true/false };
Sinaliza para o componente decidir ação
Retorno da função, não é store

- const handledError = errorHandler(error);
Acessa error.cause.status internamente
Converte erro, passando objeto puro para o estado, apenas com msg e action

*/

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // register chama authService.register
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      await authService.register(userData);
      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);
      set({ error: handledError });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // login chama authService.login e define user, ativando login
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(credentials);
      set({ user: data });
      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);
      set({ error: handledError });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // logout chama authService.logout e reseta user, desativando login
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
      set({ user: null });
      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);
      set({ error: handledError });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;

import { create } from 'zustand';
import * as authService from '../features/auth/services/authService.js';
import errorHandler from '../shared/utils/errorHandler';
import * as profileService from '../features/profile/services/profileService.js';

/*

- Nomes de estados definidos apenas com o nome de cada um
- Nomes de ações definidos com o nome de cada função mais 'Action'
- Diferencia states e actions, mantendo a store plana para acesso simples

- return { success: true/false };
Sinaliza para o componente decidir ação
Retorno da função, não é store

- const handledError = errorHandler(error);
Acessa error.cause.status internamente
Converte erro, passando objeto puro para o estado, contendo: msg, scope, status e action

- if (handledError.scope === 'global')
Só seta erros globais (status >= 500 || status === 0)

- return { success: false, error: handledError };
Se for erro local, de api, não seta, apenas retorna

- authChecked: sinaliza se app já tentou autenticar usuário

*/

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  globalError: null,
  authChecked: false,

  // register chama authService.register
  registerAction: async (userData) => {
    set({ loading: true, globalError: null });
    try {
      await authService.register(userData);
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

  // login chama authService.login e define user, ativando login
  loginAction: async (credentials) => {
    set({ loading: true, globalError: null });
    try {
      const data = await authService.login(credentials);
      set({ user: data });
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

  // logout chama authService.logout e reseta user, desativando login
  logoutAction: async () => {
    set({ loading: true, globalError: null });
    try {
      await authService.logout();
      set({ user: null });
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

  // refresh chama authService.refresh e seta user + authChecked, mantendo login caso credenciais ok ou limpando user caso ñ ok
  refreshAction: async () => {
    set({ loading: true, globalError: null });
    try {
      const data = await authService.refresh();
      set({ user: data });
      return { success: true };
    } catch (error) {
      set({ user: null });

      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        set({ globalError: handledError });
      }

      return { success: false, error: handledError };
    } finally {
      set({ loading: false, authChecked: true });
    }
  },

  // updateUser chama profileService.updateUserProfile e seta user, atualizando dados
  updateUserAction: async (profileFormData) => {
    set({ loading: true, globalError: null });

    try {
      const data = await profileService.updateUserProfile(profileFormData);
      set({ user: data });
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

  // updateSubscription chama profileService.updateSubscriptionProfile e seta user, atualizando dados
  updateSubscriptionAction: async (profileFormData) => {
    set({ loading: true, globalError: null });

    try {
      const data = await profileService.updateSubscriptionProfile(profileFormData);
      set({ user: data });
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
}));

export default useAuthStore;

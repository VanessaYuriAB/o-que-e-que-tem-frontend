import { create } from 'zustand';
import * as authService from '../features/auth/services/authService.js';
import errorHandler from '../shared/utils/errorHandler';
import useCartStore from './useCartStore.js';

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
Só seta erros globais (status >= 500 || status = 429 || type = network)

- return { success: false, error: handledError };
Se for erro local, de api, não seta, apenas retorna

- authChecked: sinaliza se app já tentou autenticar usuário

*/

const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,

  globalError: null,

  authChecked: false,

  setUserAction: (userData) => {
    set({ user: userData });
  },

  setGlobalErrorAction: (globalErrorData) => {
    set({ globalError: globalErrorData });
  },

  // register chama authService.register
  registerAction: async (userData) => {
    set({ loading: true });
    get().setGlobalErrorAction(null);
    try {
      await authService.register(userData);
      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        get().setGlobalErrorAction(handledError);
      }

      return { success: false, error: handledError };
    } finally {
      set({ loading: false });
    }
  },

  // login chama authService.login, retornado status de sucesso > chama refreshAction, hidratando a sessão > e migrateAnonymousCartAction, ajustando chave de persisitência do carrinho
  loginAction: async (credentials) => {
    set({ loading: true });

    get().setGlobalErrorAction(null);

    try {
      await authService.login(credentials);

      await get().refreshAction();

      const user = get().user;
      await useCartStore.getState().migrateAnonymousCartAction(user._id);

      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        get().setGlobalErrorAction(handledError);
      }

      return { success: false, error: handledError };
    } finally {
      set({ loading: false });
    }
  },

  // logout chama authService.logout e reseta user, desativando login
  logoutAction: async () => {
    set({ loading: true });
    get().setGlobalErrorAction(null);
    try {
      await authService.logout();
      get().setUserAction(null);
      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        get().setGlobalErrorAction(handledError);
      }

      return { success: false, error: handledError };
    } finally {
      set({ loading: false });
    }
  },

  // Bootstrap de autenticação da aplicação: lógica de hidratação da sessão de usuário (App e loginAction)
  // refresh chama authService.refresh e seta user + authChecked, ativando login caso credenciais ok ou limpando user caso ñ ok
  refreshAction: async () => {
    set({ loading: true });

    get().setGlobalErrorAction(null);

    try {
      const data = await authService.refresh();
      get().setUserAction(data);
    } catch (error) {
      get().setUserAction(null);

      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        get().setGlobalErrorAction({
          ...handledError,
          source: 'refresh',
        });
      }
    } finally {
      set({ loading: false, authChecked: true });
    }
  },
}));

export default useAuthStore;

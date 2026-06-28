import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { Users, logoutMsg } from '../../../mocks/fakeAuthDb.js';

/*

- await fakeApiError('...');
Promise.reject envia para o bloco catch

- const { data } = await decideMockOrApi(mockFn, apiFn);
Pq a resposta é configurada como { data: ..., status: ... }, tanto em fakeApi quando em api

- catch (cause) {
Erro HTTP ou de rede
Mantém erros originais da apiFetch (ou fakes), adicionando contexto - cause tem type, status e data/message; o contexto está na mensagem
}

*/

export async function register(newUserData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.register) {
        await fakeApiError('mockFn com err = true no register do authService');
      }

      const userExists = Users.find((u) => {
        return u.email === newUserData.email;
      });

      if (userExists) {
        await fakeApiError('Falha no authService.register: Usuário já cadastrado', 409);
      }

      const { userName, email, tel } = newUserData; // sem senha

      return await fakeApi({ userName, email, tel }, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/register', {
        method: 'POST',
        // header já definido em apiFetch
        reqBody: newUserData, // captura dados do escopo externo via closure
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('authService/register:', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no authService.register', { cause });
  }
}

export async function login(credentials) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.login) {
        await fakeApiError('mockFn com err = true no login do authService');
      }

      const userExists = Users.find((u) => {
        return u.email === credentials.email && u.password === credentials.password;
      });

      if (!userExists) {
        await fakeApiError('Falha no authService.login: Credenciais inválidas', 401);
      }

      const { userName, email, tel } = userExists; // dados do usuário a ser logado, sem senha

      return await fakeApi({ userName, email, tel });
    };

    const apiFn = async () => {
      return await apiFetch('/login', {
        method: 'POST',
        // header já definido em apiFetch
        reqBody: credentials, // captura dados do escopo externo via closure
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('authService/login:', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no authService.login', { cause });
  }
}

export async function logout() {
  // Avisa o servidor para apagar o cookie
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.logout) {
        await fakeApiError('mockFn com err = true no logout do authService');
      }

      return await fakeApi(logoutMsg);
    };

    const apiFn = async () => {
      return await apiFetch('/logout', {
        method: 'POST',
        // sem reqBody > sem header > definido em apiFetch
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('authService/logout:', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no authService.logout', { cause });
  }
}

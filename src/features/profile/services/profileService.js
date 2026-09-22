import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import { updateWithoutUserMsg } from '../../../mocks/fakeAuthDb.js';
import orders from '../../../mocks/fakeOrdersDb.js';
import subscriptionOrders from '../../../mocks/fakeSubscriptionOrdersDb.js';

export async function updateUserProfile(userProfileData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.updateUserProfile) {
        return await fakeApiError('mockFn com err = true no updateUserProfile do profileService');
      }

      // Busca persistência do usuário fake (update)
      const fakeUserStoraged = JSON.parse(localStorage.getItem('mockUser'));

      if (!fakeUserStoraged) {
        await fakeApiError(updateWithoutUserMsg, 401);
      }

      // Atualiza objeto de dados do usuário
      const fakeUpdatedUser = { ...fakeUserStoraged, ...userProfileData };

      // Atualiza armazenamento local (persistência)
      localStorage.setItem('mockUser', JSON.stringify(fakeUpdatedUser));

      return await fakeApi(fakeUpdatedUser);
    };

    const apiFn = async () => {
      return await apiFetch('/users/me', { method: 'PATCH', reqBody: userProfileData });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no updateUserProfile', { cause });
  }
}

export async function updateSubscriptionProfile(subscriptionProfileData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.updateSubscriptionProfile) {
        return await fakeApiError(
          'mockFn com err = true no updateSubscriptionProfile do profileService'
        );
      }

      // Busca persistência (armazenamento local), parseando (String JSON → Objeto)
      const fakeUserStoraged = JSON.parse(localStorage.getItem('mockUser'));

      if (!fakeUserStoraged) {
        await fakeApiError(updateWithoutUserMsg, 401);
      }

      // Atualiza obj de detalhes da assinatura do usuário, dentro do obj completo de usuário
      const fakeUpdatedUser = {
        ...fakeUserStoraged,
        subscriptionDetails: {
          ...fakeUserStoraged.subscriptionDetails,
          ...subscriptionProfileData,
        },
      };

      // Atualiza persistência, stringficando (Objeto → String JSON)
      localStorage.setItem('mockUser', JSON.stringify(fakeUpdatedUser));

      return await fakeApi(fakeUpdatedUser);
    };

    const apiFn = async () => {
      return await apiFetch('/users/subscriptions/me', {
        method: 'PATCH',
        reqBody: subscriptionProfileData,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no updateSubscriptionProfile', { cause });
  }
}

// Pedidos avulsos do usuário logado
export async function getOrdersByUserId(userId) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getOrdersByUserId) {
        await fakeApiError('mockFn com err = true no getOrdersByUserId do profileService');
      }

      // Simulação do backend
      const userOrders = orders.filter((order) => order.owner === userId);

      // Caso não existam pedidos o retorno é []; não é um erro, e é direcionado no próprio componente

      return await fakeApi(userOrders);
    };

    const apiFn = async () => {
      return await apiFetch(`/users/${userId}/orders`);
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return Array.isArray(data) ? data : [];
  } catch (cause) {
    throw new Error('Falha no profileService.getOrdersByUserId', { cause });
  }
}

// Pedidos de assinatura do usuário logado
export async function getSubscriptionOrdersByUserId(userId) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getSubscriptionOrdersByUserId) {
        await fakeApiError(
          'mockFn com err = true no getSubscriptionOrdersByUserId do profileService'
        );
      }

      // Simulação do backend
      const userSubscriptionOrders = subscriptionOrders.filter(
        (subscriptionOrder) => subscriptionOrder.owner === userId
      );

      // Caso não existam pedidos de assinatura o retorno é []; não é um erro, e é direcionado no próprio componente

      return await fakeApi(userSubscriptionOrders);
    };

    const apiFn = async () => {
      return await apiFetch(`/users/${userId}/subscriptions/orders`);
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return Array.isArray(data) ? data : [];
  } catch (cause) {
    throw new Error('Falha no profileService.getSubscriptionOrdersByUserId', { cause });
  }
}

import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import apiFetch from '../../../services/api.js';
import useAuthStore from '../../../store/useAuthStore.js';
import subscriptionOrders from '../../../mocks/fakeSubscriptionOrdersDb.js';
import generateMockOrderNumber from '../../../shared/utils/generateMockOrderNumber.js';
import { updateWithoutUserMsg } from '../../../mocks/fakeAuthDb.js';

export async function subscribe(newSubscriptionData) {
  try {
    const mockFn = async () => {
      const user = useAuthStore.getState().user;

      if (FAKE_ERRORS.subscribe) {
        await fakeApiError('mockFn com err = true no subscribe do subscriptionService');
      }

      // Calcula 'endAt'
      const months =
        newSubscriptionData.howLong === 'two'
          ? 2
          : newSubscriptionData.howLong === 'four'
            ? 4
            : newSubscriptionData.howLong === 'six'
              ? 6
              : 12;

      const end = new Date();
      end.setMonth(end.getMonth() + months);

      // Busca persistência do usuário fake
      const fakeUserStoraged = JSON.parse(localStorage.getItem('mockUser'));

      if (!fakeUserStoraged) {
        await fakeApiError(updateWithoutUserMsg, 401);
      }

      // Atualiza objeto de dados do usuário: define mock com dados de assinatura (mantendo dados de endereço, caso assinatura seja feita sem)
      const fakeUpdatedUserWithSubscription = {
        ...fakeUserStoraged,

        _id: user._id ?? 'user-mock',

        subscription: true,

        subscriptionDetails: {
          owner: user._id ?? 'user-mock',
          status: true,

          howLong: newSubscriptionData.howLong,
          daysOn: newSubscriptionData.daysOn,
          schedules: newSubscriptionData.schedules,
          method: newSubscriptionData.method,
          pay: newSubscriptionData.pay,

          createdAt: new Date().toISOString(),
          endAt: end.toISOString(),
        },
      };

      // Ajusta persistência, atualizando armazemanento local
      localStorage.setItem('mockUser', JSON.stringify(fakeUpdatedUserWithSubscription));

      // Retorna dados (201)
      return await fakeApi(fakeUpdatedUserWithSubscription, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/subscriptions', {
        method: 'POST',
        // header definido em apiFetch
        reqBody: newSubscriptionData,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no subscriptionService.subscribe', { cause });
  }
}

// Rastrear pedidos de assinatura (nº do pedido + email)
export async function getSubscriptionOrderByNumber(subscriptionOrderData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getSubscriptionOrderByNumber) {
        await fakeApiError(
          'mockFn com err = true no getSubscriptionOrderByNumber do subscriptionService'
        );
      }

      // Simula a verificação do servidor
      const subscriptionOrderFinded = subscriptionOrders.find(
        (subscriptionOrder) =>
          subscriptionOrder.orderNumber === subscriptionOrderData.orderNumber &&
          subscriptionOrder.customerSnapshot.email === subscriptionOrderData.email
      );

      if (subscriptionOrderFinded === undefined) {
        await fakeApiError(`O pedido ${subscriptionOrderData.orderNumber} não foi localizado`, 404);
      }

      return await fakeApi(subscriptionOrderFinded);
    };

    const apiFn = async () => {
      return await apiFetch(
        `/subscriptions/orders/${subscriptionOrderData.orderNumber}?email=${subscriptionOrderData.email}`
      );
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no subscriptionService.getSubscriptionOrderByNumber', { cause });
  }
}

// Enviar pedido de assinatura (Checkout)
export async function sendSubscriptionOrderToServer(subscriptionOrder) {
  try {
    const mockFn = async () => {
      const user = useAuthStore.getState().user;

      if (FAKE_ERRORS.sendSubscriptionOrderToServer) {
        await fakeApiError(
          'mockFn com err = true no sendSubscriptionOrderToServer do subscriptionService'
        );
      }

      const mockSubscriptionOrder = {
        _id: 'subscription-order-mock',
        owner: user?._id ?? null,
        createdAt: new Date().toISOString(),
        orderNumber: generateMockOrderNumber('subscriptionOrderType'),
        ...subscriptionOrder,
      };

      // Adiciona pedido no mock de 'subscriptionOrders'
      subscriptionOrders.unshift(mockSubscriptionOrder);

      return await fakeApi(mockSubscriptionOrder, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/subscriptions/orders', {
        method: 'POST',
        reqBody: subscriptionOrder,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no subscriptionService.sendSubscriptionOrderToServer', { cause });
  }
}

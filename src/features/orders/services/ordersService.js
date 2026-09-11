import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApiError, fakeApi } from '../../../shared/utils/fakeApi.js';
import orders from '../../../mocks/fakeOrdersDb.js';
import subscriptionOrders from '../../../mocks/fakeSubscriptionOrdersDb.js';

// Rastrear pedidos avulsos (nº do pedido + email)
export async function getOrderByNumber(orderData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getOrderByNumber) {
        await fakeApiError('mockFn com err = true no getOrderByNumber do ordersService');
      }

      // Simula a verificação do servidor
      const orderFinded = orders.find(
        (order) =>
          order.orderNumber === orderData.orderNumber &&
          order.customerSnapshot.email === orderData.email
      );

      if (orderFinded === undefined) {
        await fakeApiError(`O pedido ${orderData.orderNumber} não foi localizado`, 404);
      }

      return await fakeApi(orderFinded);
    };

    const apiFn = async () => {
      return await apiFetch(`/orders/${orderData.orderNumber}?email=${orderData.email}`);
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('getOrderByNumber', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no ordersService.getOrderByNumber', { cause });
  }
}

// Rastrear pedidos de assinatura (nº do pedido + email)
export async function getSubscriptionOrderByNumber(subscriptionOrderData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getSubscriptionOrderByNumber) {
        await fakeApiError(
          'mockFn com err = true no getSubscriptionOrderByNumber do ordersService'
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
        `/subscribe-orders/${subscriptionOrderData.orderNumber}?email=${subscriptionOrderData.email}`
      );
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('getSubscriptionOrderByNumber', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no ordersService.getSubscriptionOrderByNumber', { cause });
  }
}

// Pedidos avulsos do usuário logado
export async function getOrdersByUserId(userId) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getOrdersByUserId) {
        await fakeApiError('mockFn com err = true no getOrdersByUserId do ordersService');
      }

      // Simulação do backend
      const userOrders = orders.filter((order) => order.owner === userId);

      // Caso não existam pedidos o retorno é []; não é um erro, e é direcionado no próprio componente

      return await fakeApi(userOrders);
    };

    const apiFn = async () => {
      return await apiFetch(`/orders/${userId}`);
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('getOrdersByUserId', data);
    return Array.isArray(data) ? data : [];
  } catch (cause) {
    throw new Error('Falha no ordersService.getOrdersByUserId', { cause });
  }
}

// Pedidos de assinatura do usuário logado
export async function getSubscriptionOrdersByUserId(userId) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getSubscriptionOrdersByUserId) {
        await fakeApiError(
          'mockFn com err = true no getSubscriptionOrdersByUserId do ordersService'
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
      return await apiFetch(`/subscribe-orders/${userId}`);
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('getSubscriptionOrdersByUserId', data);
    return Array.isArray(data) ? data : [];
  } catch (cause) {
    throw new Error('Falha no ordersService.getSubscriptionOrdersByUserId', { cause });
  }
}

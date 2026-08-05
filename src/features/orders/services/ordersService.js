import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApiError, fakeApi } from '../../../shared/utils/fakeApi.js';
import orders from '../../../mocks/fakeOrdersDb.js';

// Rastrear pedidos (nº do pedido + email)
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
      return await apiFetch(`/orders/:${orderData.orderNumber}?email=${orderData.email}`);
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('getOrderByNumber', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no ordersService.getOrderByNumber', { cause });
  }
}

// Pedidos do usuário logado
export async function getOrderById(userId) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getOrderById) {
        await fakeApiError('mockFn com err = true no getOrderById do ordersService');
      }

      // Simulação do backend
      const userOrders = orders.filter((order) => order.owner === userId);

      // Caso não existam pedidos o retorno é []; não é um erro, e é direcionado no próprio componente

      return await fakeApi(userOrders);
    };

    const apiFn = async () => {
      return await apiFetch(`/orders/:${userId}`);
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('getOrderById', data);
    return Array.isArray(data) ? data : [];
  } catch (cause) {
    throw new Error('Falha no ordersService.getOrderById', { cause });
  }
}

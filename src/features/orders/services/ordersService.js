import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApiError, fakeApi } from '../../../shared/utils/fakeApi.js';
import orders from '../../../mocks/fakeOrdersDb.js';
import useAuthStore from '../../../store/useAuthStore.js';
import generateMockOrderNumber from '../../checkout/utils/generateMockOrderNumber.js';

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

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no ordersService.getOrderByNumber', { cause });
  }
}

// Enviar pedido avulso (Checkout)
export async function sendOrderToServer(order) {
  try {
    const mockFn = async () => {
      const user = useAuthStore.getState().user;

      if (FAKE_ERRORS.sendOrderToServer) {
        await fakeApiError('mockFn com err = true no sendOrderToServer do ordersService');
      }

      const mockOrder = {
        _id: 'order-mock',
        owner: user?._id ?? null,
        createdAt: new Date().toISOString(),
        orderNumber: generateMockOrderNumber('orderType'),
        ...order,
      };

      // Adiciona pedido no mock de 'orders'
      orders.push(mockOrder);

      return await fakeApi(mockOrder, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/orders', {
        method: 'POST',
        reqBody: order,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no ordersService.sendOrderToServer', { cause });
  }
}

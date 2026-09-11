import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import useAuthStore from '../../../store/useAuthStore.js';
import generateMockOrderNumber from '../utils/generateMockOrderNumber.js';
import orders from '../../../mocks/fakeOrdersDb.js';
import subscriptionOrders from '../../../mocks/fakeSubscriptionOrdersDb.js';

export async function sendOrderToServer(order) {
  try {
    const mockFn = async () => {
      const user = useAuthStore.getState().user;

      if (FAKE_ERRORS.sendOrderToServer) {
        await fakeApiError('mockFn com err = true no sendOrderToServer do checkoutService');
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

    console.log('checkoutService/sendOrderToServer:', data);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no checkoutService.sendOrderToServer', { cause });
  }
}

export async function sendSubscribeOrderToServer(subscriptionOrder) {
  try {
    const mockFn = async () => {
      const user = useAuthStore.getState().user;

      if (FAKE_ERRORS.sendSubscribeOrderToServer) {
        await fakeApiError(
          'mockFn com err = true no sendSubscribeOrderToServer do checkoutService'
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
      subscriptionOrders.push(mockSubscriptionOrder);

      return await fakeApi(mockSubscriptionOrder, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/subscribe-orders', {
        method: 'POST',
        reqBody: subscriptionOrder,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('checkoutService/sendSubscribeOrderToServer:', data);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no checkoutService.sendSubscribeOrderToServer', { cause });
  }
}

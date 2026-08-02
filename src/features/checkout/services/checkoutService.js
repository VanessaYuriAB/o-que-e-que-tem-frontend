import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import useAuthStore from '../../../store/useAuthStore.js';

async function sendOrderToServer(order) {
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
        orderNumber: 202608010001,
        ...order,
      };

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

export default sendOrderToServer;

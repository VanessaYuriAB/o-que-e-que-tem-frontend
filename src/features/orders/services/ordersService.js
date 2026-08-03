import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApiError, fakeApi } from '../../../shared/utils/fakeApi.js';
import orders from '../../../mocks/fakeOrdersDb.js';

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

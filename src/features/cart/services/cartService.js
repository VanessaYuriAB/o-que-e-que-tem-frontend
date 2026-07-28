import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';

export async function addItemToCart(item) {
  if (FAKE_ERRORS.addItemToCart) {
    return fakeApiError(
      'addItemToCart com err = true no cartService, desconsiderar status e type, pois a persistência do carrinho está configurada apenas no armazenamento local, sem api (por enquanto)'
    );
  }

  console.log('cartService/addItemToCart:', item);

  const { data } = fakeApi(item);

  return data;
}

export async function removeItemToCart(item) {
  if (FAKE_ERRORS.removeItemToCart) {
    return fakeApiError(
      'removeItemToCart com err = true no cartService, desconsiderar status e type, pois a persistência do carrinho está configurada apenas no armazenamento local, sem api (por enquanto)'
    );
  }

  console.log('cartService/removeItemToCart:', item);

  const { data } = fakeApi(item);

  return data;
}

export async function setPackData(pack) {
  if (FAKE_ERRORS.setPackData) {
    return fakeApiError(
      'setPackData com err = true no cartService, desconsiderar status e type, pois a persistência do carrinho está configurada apenas no armazenamento local, sem api (por enquanto)'
    );
  }

  console.log('cartService/setPackData:', pack);

  const { data } = fakeApi(pack);

  return data;
}

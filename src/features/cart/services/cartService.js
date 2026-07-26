import { fakeApi } from '../../../shared/utils/fakeApi.js';

export function addItemToCart(item) {
  console.log('cartService/addItemToCart:', item);

  const { data } = fakeApi(item, 200);

  return data;
}

export function removeItemToCart(item) {
  console.log('cartService/removeItemToCart:', item);

  const { data } = fakeApi(item, 200);

  return data;
}

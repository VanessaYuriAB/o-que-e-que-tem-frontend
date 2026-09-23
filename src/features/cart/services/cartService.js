import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';

/* Services do carrinho mantém o padrão de fakeApi e fakeApiError, ajustando 'type' para 'cart' e adicionando a propriedade 'code' para condicionamento no errorHandler. Persistido apenas em armazenamento local, sem api. */

export async function addItemToCart(item, delay = 500) {
  if (FAKE_ERRORS.addItemToCart) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject({
          type: 'cart',
          status: null,
          data: item,
          message:
            'addItemToCart com err = true no cartService, desconsiderar status, pois a persistência do carrinho está configurada apenas no armazenamento local, sem api (por enquanto)',
          code: 'ITEM_ADD_FAILED',
        });
      }, delay);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: JSON.parse(JSON.stringify(item)), status: 200 });
    }, delay);
  });
}

export async function removeItemToCart(item, delay = 500) {
  if (FAKE_ERRORS.removeItemToCart) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject({
          type: 'cart',
          status: null,
          data: item,
          message:
            'removeItemToCart com err = true no cartService, desconsiderar status, pois a persistência do carrinho está configurada apenas no armazenamento local, sem api (por enquanto)',
          code: 'ITEM_REMOVE_FAILED',
        });
      }, delay);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: JSON.parse(JSON.stringify(item)), status: 200 });
    }, delay);
  });
}

export async function setCartData(cartData, delay = 500) {
  if (FAKE_ERRORS.setCartData) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject({
          type: 'cart',
          status: null,
          data: cartData,
          message:
            'setCartData com err = true no cartService, desconsiderar status, pois a persistência do carrinho está configurada apenas no armazenamento local, sem api (por enquanto)',
          code: 'CART_SAVE_FAILED',
        });
      }, delay);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: JSON.parse(JSON.stringify(cartData)), status: 200 });
    }, delay);
  });
}

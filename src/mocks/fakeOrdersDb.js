import { user2, user3 } from '../mocks/fakeAuthDb.js';
import itemsMenu from './fakeMenuDb.js';

const order1 = {
  _id: 'order-1',
  owner: user2._id,
  createdAt: new Date().toISOString(),

  orderNumber: '202608052114',

  meal: 'pate',
  method: 'delivery',
  payment: 'credito',
  amount: 45,

  customerSnapshot: {
    userName: user2.userName,
    email: user2.email,
    tel: user2.tel,
  },

  addressSnapshot: {
    address: user2.address,
    number: user2.number,
    complement: user2.complement,
    district: user2.district,
    cep: user2.cep,
  },

  itemsSnapshot: [itemsMenu[0], itemsMenu[1], itemsMenu[6], itemsMenu[9], itemsMenu[16]],

  /*itemsSnapshot: [
    {
      _id: 1,
      productName: 'Abóbora',
      category: 'verduras-legumes',
      qtyAvailable: 10,
      partnerName: 'Mercado 1',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 2,
      productName: 'Espinafre',
      category: 'verduras-legumes',
      qtyAvailable: 10,
      partnerName: 'Mercado 2',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 7,
      productName: 'Grão de bico',
      category: 'leguminosas-oleaginosas',
      qtyAvailable: 25,
      partnerName: 'Mercado 1',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 10,
      productName: 'Leite de soja',
      category: 'leites-derivados',
      qtyAvailable: 15,
      partnerName: 'Mercado 1',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 16,
      productName: 'Azeite de oliva',
      category: 'oleos-gorduras',
      qtyAvailable: 8,
      partnerName: 'Mercado 1',
      availableUntil: new Date().toISOString(),
    },
  ],*/

  obs: user2.infoText,
};

const order2 = {
  _id: 'order-2',
  owner: user3._id,
  createdAt: new Date().toISOString(),

  orderNumber: '202608053314',

  meal: 'sopa',
  method: 'drive-thru',
  payment: 'pix',
  amount: 35,

  customerSnapshot: {
    userName: user3.userName,
    email: user3.email,
    tel: user3.tel,
  },

  addressSnapshot: undefined,

  itemsSnapshot: [itemsMenu[2], itemsMenu[3], itemsMenu[7], itemsMenu[8]],

  /*itemsSnapshot: [
    {
      _id: 3,
      productName: 'Cenoura',
      category: 'verduras-legumes',
      qtyAvailable: 10,
      partnerName: 'Mercado 3',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 4,
      productName: 'Mandioca',
      category: 'carboidratos',
      qtyAvailable: 0,
      partnerName: 'Mercado 1',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 8,
      productName: 'Feijão preto',
      category: 'leguminosas-oleaginosas',
      qtyAvailable: 30,
      partnerName: 'Mercado 2',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 9,
      productName: 'Linhaça',
      category: 'leguminosas-oleaginosas',
      qtyAvailable: 30,
      partnerName: 'Mercado 3',
      availableUntil: new Date().toISOString(),
    },
  ],*/

  obs: user3.infoText,
};

const order3 = {
  _id: 'order-3',
  owner: user3._id,
  createdAt: new Date().toISOString(),

  orderNumber: '202608053914',

  meal: 'creme',
  method: 'delivery',
  payment: 'debito',
  amount: 30,

  customerSnapshot: {
    userName: user3.userName,
    email: user3.email,
    tel: user3.tel,
  },

  addressSnapshot: {
    address: user3.address,
    number: user3.number,
    complement: user3.complement,
    district: user3.district,
    cep: user3.cep,
  },

  itemsSnapshot: [itemsMenu[1], itemsMenu[5], itemsMenu[8], itemsMenu[9], itemsMenu[16]],

  /*itemsSnapshot: [
    {
      _id: 2,
      productName: 'Espinafre',
      category: 'verduras-legumes',
      qtyAvailable: 10,
      partnerName: 'Mercado 2',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 6,
      productName: 'Macarrão integral',
      category: 'carboidratos',
      qtyAvailable: 20,
      partnerName: 'Mercado 3',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 9,
      productName: 'Linhaça',
      category: 'leguminosas-oleaginosas',
      qtyAvailable: 30,
      partnerName: 'Mercado 3',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 10,
      productName: 'Leite de soja',
      category: 'leites-derivados',
      qtyAvailable: 15,
      partnerName: 'Mercado 1',
      availableUntil: new Date().toISOString(),
    },
    {
      _id: 17,
      productName: 'Óleo de gergelim',
      category: 'oleos-gorduras',
      qtyAvailable: 22,
      partnerName: 'Mercado 2',
      availableUntil: new Date().toISOString(),
    },
  ],*/

  obs: user3.infoText,
};

const orders = [order1, order2, order3];

export default orders;

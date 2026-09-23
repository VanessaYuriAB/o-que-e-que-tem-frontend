import { user1, user2 } from './fakeAuthDb.js';
import itemsMenu from './fakeMenuDb.js';

const subscriptionOrder1 = {
  _id: 'subscriptionOrder-1',
  owner: user1._id,
  createdAt: new Date('2026-08-31T10:00:56').toISOString(),

  orderNumber: 'S202609094814',

  meal: 'pate',
  method: user1.subscriptionDetails.method,
  day: '01/09/2026',
  time: '10:50',

  customerSnapshot: {
    userName: user1.userName,
    email: user1.email,
    tel: user1.tel,
  },

  addressSnapshot: {
    address: user1.address,
    number: user1.number,
    complement: user1.complement,
    district: user1.district,
    cep: user1.cep,
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

  obs: user1.infoText,
};

const subscriptionOrder2 = {
  _id: 'subscriptionOrder-2',
  owner: user1._id,
  createdAt: new Date('2026-09-02T10:40:27').toISOString(),

  orderNumber: 'S202609091521',

  meal: 'sopa',
  method: user1.subscriptionDetails.method,
  day: '03/09/2026',
  time: '11:20',

  customerSnapshot: {
    userName: user1.userName,
    email: user1.email,
    tel: user1.tel,
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

  obs: user1.infoText,
};

const subscriptionOrder3 = {
  _id: 'subscriptionOrder-3',
  owner: user2._id,
  createdAt: new Date('2026-09-03T19:02:18').toISOString(),

  orderNumber: 'S202609091522',

  meal: 'creme',
  method: user2.subscriptionDetails.method,
  day: '04/09/2026',
  time: '19:45',

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

  obs: user2.infoText,
};

const subscriptionOrders = [subscriptionOrder1, subscriptionOrder2, subscriptionOrder3];

export default subscriptionOrders;

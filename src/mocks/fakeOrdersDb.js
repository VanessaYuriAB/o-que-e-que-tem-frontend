const order1 = {
  _id: 'order-1',
  owner: 'user-1',
  createdAt: new Date().toISOString(),

  orderNumber: '202608013417',

  meal: 'pate',
  method: 'delivery',
  payment: 'credito',
  amount: 45,

  customerSnapshot: {
    userName: 'Mock Name',
    email: 'mockname@email.com',
    tel: '(11) 88888-8888',
  },

  addressSnapshot: {
    address: 'Rua do mock order',
    number: 456,
    complement: '-',
    district: 'Bairro do mock',
    cep: '44444-444',
  },

  itemsSnapshot: [
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
  ],

  obs: 'Obs do mock',
};

const order2 = {
  _id: 'order-2',
  owner: 'user-3',
  createdAt: new Date().toISOString(),

  orderNumber: '202608014517',

  meal: 'sopa',
  method: 'drive-thru',
  payment: 'pix',
  amount: 35,

  customerSnapshot: {
    userName: 'Mock Name 2',
    email: 'mockname2@email.com',
    tel: '(11) 77777-7777',
  },

  addressSnapshot: undefined,

  itemsSnapshot: [
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
  ],

  obs: 'Obs do mock 2',
};

const orders = [order1, order2];

export default orders;

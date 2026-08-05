/* DADOS ENVIADOS PELOS FORMULÁRIOS */

/* Register (success) e Login (401) */

export const user = {
  userName: 'User',
  email: 'user@email.com',
  confirmEmail: 'user@email.com',
  tel: '(11) 1111-1111',
  password: 'senha123',
  confirmPassword: 'senha123',
};

/* Register (409) e Login (success) */

export const user1 = {
  _id: 'user-1',
  userName: 'User 1',
  email: 'user1@email.com',
  confirmEmail: 'user1@email.com',
  tel: '(11) 11111-1111',
  password: 'abcd1234',
  confirmPassword: 'abcd1234',
  address: 'Rua de exemplo para mock 1',
  number: '1',
  complement: 'Apto 1',
  district: 'Bairro mock 1',
  cep: '11111-111',
  infoText: 'Infos adicionais mock 1',
  subscription: true,
  subscriptionDetails: {
    status: true,
    begin: '2026-06-27', // input date : "o formato da data mostrada difere do value atual — o formato da data mostrada será escolhido baseado na localização definida no navegador do usuário, enquanto que a data em value sempre será formatado como yyyy-mm-dd"
    end: '2027-12-27', // input date (begin + 6 meses)
    daysOn: ['ter', 'qui'], // input checkbox
    method: 'drive-thru', // input radio
    next: '2026-07-23', // input date
  },
};

export const user2 = {
  _id: 'user-2',
  userName: 'User 2',
  email: 'user2@email.com',
  confirmEmail: 'user2@email.com',
  tel: '(11) 22222-2222',
  password: 'efgh5678',
  confirmPassword: 'efgh5678',
  address: 'Rua de exemplo para mock 2',
  number: '2',
  complement: 'Apto 2',
  district: 'Bairro mock 2',
  cep: '22222-222',
  infoText: 'Infos adicionais mock 2',
  subscription: true,
  subscriptionDetails: {
    status: false,
    begin: '2026-07-21',
    end: '2027-01-21',
    daysOn: ['seg', 'qua', 'sex'],
    method: 'delivery',
    next: '2026-07-22',
  },
};

export const user3 = {
  _id: 'user-3',
  userName: 'User 3',
  email: 'user3@email.com',
  confirmEmail: 'user3@email.com',
  tel: '(11) 33333-3333',
  password: 'ijkl9101112',
  confirmPassword: 'ijkl9101112',
  address: 'Rua de exemplo para mock 3',
  number: '3',
  complement: '-',
  district: 'Bairro mock 3',
  cep: '33333-333',
  infoText: '',
  subscription: false,
  subscriptionDetails: {},
};

export const user4 = {
  _id: 'user-4',
  userName: 'User 4',
  email: 'user4@email.com',
  confirmEmail: 'user4@email.com',
  tel: '(11) 44444-4444',
  password: 'ijkl8765',
  confirmPassword: 'ijkl8765',
  address: 'Rua de exemplo para mock 4',
  number: '4',
  complement: 'Apto 4',
  district: 'Bairro mock 4',
  cep: '44444-444',
  infoText: 'Infos adicionais mock 4',
  subscription: false,
  subscriptionDetails: {}, // role: admin
};

/* DADOS PARA CONSULTA DE BANCO */

/* users */

/*
user1 tem assinatura e não tem pedido,
user2 tem pedido e assinatura,
user3 tem pedido e não tem assinatura,
user4 é admin
*/

export const users = [
  // user 1
  {
    _id: 'user-1',
    userName: 'User 1',
    email: 'user1@email.com',
    tel: '(11) 11111-1111',
    password: 'abcd1234',
    role: 'user',
    address: 'Rua de exemplo para mock 1',
    number: '1',
    complement: 'Apto 1',
    district: 'Bairro mock 1',
    cep: '11111-111',
    infoText: 'Infos adicionais mock 1',
    subscription: true,
    subscriptionDetails: {
      status: true,
      begin: '2026-06-27',
      end: '2027-12-27',
      daysOn: ['ter', 'qui'],
      method: 'drive-thru',
      next: '2026-07-23',
    },
  },
  // user 2
  {
    _id: 'user-2',
    userName: 'User 2',
    email: 'user2@email.com',
    tel: '(11) 22222-2222',
    password: 'efgh5678',
    role: 'user',
    address: 'Rua de exemplo para mock 2',
    number: '2',
    complement: 'Apto 2',
    district: 'Bairro mock 2',
    cep: '22222-222',
    infoText: 'Infos adicionais mock 2',
    subscription: true,
    subscriptionDetails: {
      status: false,
      begin: '2026-07-21',
      end: '2027-01-21',
      daysOn: ['seg', 'qua', 'sex'],
      method: 'delivery',
      next: '2026-07-22',
    },
  },
  // user 3
  {
    _id: 'user-3',
    userName: 'User 3',
    email: 'user3@email.com',
    tel: '(11) 33333-3333',
    password: 'ijkl9101112',
    role: 'user',
    address: 'Rua de exemplo para mock 3',
    number: '3',
    complement: '-',
    district: 'Bairro mock 3',
    cep: '33333-333',
    infoText: '',
    subscription: false,
    subscriptionDetails: {}, // role: user
  },
  // user 4 (admin)
  {
    _id: 'user-4',
    userName: 'User 4',
    email: 'user4@email.com',
    tel: '(11) 44444-4444',
    password: 'ijkl8765',
    role: 'admin',
    address: 'Rua de exemplo para mock 4',
    number: '4',
    complement: 'Apto 4',
    district: 'Bairro mock 4',
    cep: '44444-444',
    infoText: 'Infos adicionais mock 4',
    subscription: false,
    subscriptionDetails: {}, // role: admin
  },
];

/* Logout */

export const logoutMsg = { message: 'Logout realizado' };

/* Refresh */

export const refreshWithoutUserMsg =
  'Falha no authService.refresh: Não autorizado, não existe usuário local salvo (storaged)';

/* Update */

export const updateWithoutUserMsg =
  'Falha no profileService.updateUserProfile: Não autorizado, não existe usuário local salvo (storaged)';

/* DADOS ENVIADOS PELOS FORMULÁRIOS */

/* Register (success) e Login (401) */

export const User = {
  name: 'User',
  email: 'user@email.com',
  tel: '(11) 11111-1111',
  password: 'senha123',
};

/* Register (409) e Login (success) */

export const User1 = {
  name: 'User 1',
  email: 'user1@email.com',
  tel: '(11) 99999-9999',
  password: 'abcd1234',
};

export const User2 = {
  name: 'User 2',
  email: 'user2@email.com',
  tel: '(11) 88888-8888',
  password: 'efgh5678',
};

export const User3 = {
  name: 'User 3',
  email: 'user3@email.com',
  tel: '(11) 77777-7777',
  password: 'ijkl9101112',
};

/* DADOS PARA CONSULTA DE BANCO */

/* Users */

export const Users = [
  // User 1
  {
    id: 1,
    name: 'User 1',
    email: 'user1@email.com',
    tel: '(11) 99999-9999',
    password: 'abcd1234',
    role: 'user',
  },
  // User 2
  {
    id: 2,
    name: 'User 2',
    email: 'user2@email.com',
    tel: '(11) 88888-8888',
    password: 'efgh5678',
    role: 'user',
  },
  // User 3
  {
    id: 3,
    name: 'User 3',
    email: 'user3@email.com',
    tel: '(11) 77777-7777',
    password: 'ijkl9101112',
    role: 'admin',
  },
];

/* Logout */

export const logoutMsg = { message: 'Logout realizado' };

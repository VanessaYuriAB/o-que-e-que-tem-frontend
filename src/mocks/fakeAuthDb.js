/* DADOS ENVIADOS PELOS FORMULÁRIOS */

/* Register (success) e Login (401) */

export const User = {
  userName: 'User',
  email: 'user@email.com',
  confirmEmail: 'user@email.com',
  tel: '(11) 1111-1111',
  password: 'senha123',
  confirmPassword: 'senha123',
};

/* Register (409) e Login (success) */

export const User1 = {
  userName: 'User 1',
  email: 'user1@email.com',
  confirmEmail: 'user1@email.com',
  tel: '(11) 99999-9999',
  password: 'abcd1234',
  confirmPassword: 'abcd1234',
  address: 'Rua de exemplo para mock 1',
  number: '1',
  complement: 'Apto 1',
  district: 'Bairro mock 1',
  cep: '99999-999',
  infoText: 'Infos adicionais mock 1',
};

export const User2 = {
  userName: 'User 2',
  email: 'user2@email.com',
  confirmEmail: 'user2@email.com',
  tel: '(11) 88888-8888',
  password: 'efgh5678',
  confirmPassword: 'efgh5678',
  address: 'Rua de exemplo para mock 2',
  number: '2',
  complement: 'Apto 2',
  district: 'Bairro mock 2',
  cep: '88888-888',
  infoText: 'Infos adicionais mock 2',
};

export const User3 = {
  userName: 'User 3',
  email: 'user3@email.com',
  confirmEmail: 'user3@email.com',
  tel: '(11) 77777-7777',
  password: 'ijkl9101112',
  confirmPassword: 'ijkl9101112',
  address: 'Rua de exemplo para mock 1',
  number: '3',
  complement: '',
  district: 'Bairro mock 3',
  cep: '77777-777',
  infoText: '',
};

/* DADOS PARA CONSULTA DE BANCO */

/* Users */

export const Users = [
  // User 1
  {
    id: 1,
    userName: 'User 1',
    email: 'user1@email.com',
    tel: '(11) 99999-9999',
    password: 'abcd1234',
    role: 'user',
    address: 'Rua de exemplo para mock 1',
    number: '1',
    complement: 'Apto 1',
    district: 'Bairro mock 1',
    cep: '99999-999',
    infoText: 'Infos adicionais mock 1',
  },
  // User 2
  {
    id: 2,
    userName: 'User 2',
    email: 'user2@email.com',
    tel: '(11) 88888-8888',
    password: 'efgh5678',
    role: 'user',
    address: 'Rua de exemplo para mock 2',
    number: '2',
    complement: 'Apto 2',
    district: 'Bairro mock 2',
    cep: '88888-888',
    infoText: 'Infos adicionais mock 2',
  },
  // User 3
  {
    id: 3,
    userName: 'User 3',
    email: 'user3@email.com',
    tel: '(11) 77777-7777',
    password: 'ijkl9101112',
    role: 'admin',
    address: 'Rua de exemplo para mock 1',
    number: '3',
    complement: '',
    district: 'Bairro mock 3',
    cep: '77777-777',
    infoText: '',
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

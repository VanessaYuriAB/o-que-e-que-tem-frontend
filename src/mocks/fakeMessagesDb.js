import { user1, user2 } from '../mocks/fakeAuthDb.js';

const msg1 = {
  _id: 'msg-1',
  createdAt: '08/09/2026, 17:25:48',
  owner: user1._id,
  userName: user1.userName,
  email: user1.email,
  whatsapp: user1.tel,
  message: 'Olá. Gostaria de alterar a forma de entrega do meu próximo pedido. Como faço?',
  method: 'whatsapp',
  status: true,
  responseAt: '08/09/2026, 19:40:05',
  response: `Oi, ${user1.userName}! Se é apenas para a próxima refeição, já está anotado. Entregaremos no seu endereço cadastrado, no horário do contrato :)`,
};

const msg2 = {
  _id: 'msg-2',
  createdAt: '04/09/2026, 12:46:01',
  owner: user2._id,
  userName: user2.userName,
  email: user2.email,
  whatsapp: user2.tel,
  message: 'Olá, boa tarde! Gostaria de pausar a minha assinatura por um tempo. Podem me auxiliar?',
  method: 'email',
  status: true,
  responseAt: '04/09/2026, 14:56:32',
  response: `Olá, ${user2.userName}, boa tarde! Você pode pausar através da página do seu perfil na plataforma. Abaixo dos campos com as configurações da sua assinatura existem dois botões, um deles é para pausar. Inclusive, quando quiser retomar, é por este mesmo botão, que terá a mensagem 'Retomar. Se tiver algum empecilho, pode entrar em contato conosco novamente :)`,
};

const msg3 = {
  _id: 'msg-3',
  createdAt: '09/09/2026, 18:19:58',
  owner: user2._id,
  userName: user2.userName,
  email: user2.email,
  whatsapp: user2.tel,
  message: 'Olá! Consigo usar a minha assinatura para mais uma pessoa, quando precisar?',
  method: 'email',
  status: true,
  responseAt: '10/09/2026, 11:40:18',
  response: `Oi, ${user2.userName}, bom dia! Sim, desde que não aumente a quantidade de refeições por semana. Se for para delivery, no momento de confirmar o pedido, você pode colocar o outro endereço, mas, neste caso, ele não pode ser muito distante do seu cadastrado em sistema, devido nossa organização de trajeto. Caso a distância seja grande, pode nos enviar o endereço do local para verificarmos a possibilidade de entrega e, se necessário, combinarmos ajustes (horário e valor) :)`,
};

const msg4 = {
  _id: 'msg-4',
  createdAt: '10/09/2026, 16:14:54',
  owner: user1._id,
  userName: user1.userName,
  email: user1.email,
  whatsapp: user1.tel,
  message: 'Boa tarde! Posso alterar a forma de entrega novamente para o próximo pedido?',
  method: 'whatsapp',
  status: false,
  responseAt: '',
  response: '',
};

const messages = [msg1, msg2, msg3, msg4];

export default messages;

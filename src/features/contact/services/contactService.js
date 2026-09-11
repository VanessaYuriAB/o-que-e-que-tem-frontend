import decideMockOrApi from '../../../shared/utils/helperMockOrApi';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApiError, fakeApi } from '../../../shared/utils/fakeApi.js';
import apiFetch from '../../../services/api.js';
import messages from '../../../mocks/fakeMessagesDb.js';

async function sendUserMessage(messageData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.sendUserMessage) {
        await fakeApiError('mockFn com err = true no sendUserMessage do contactService');
      }

      localStorage.setItem('userMsg', JSON.stringify(messageData));

      return await fakeApi(messageData, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/messages', {
        method: 'POST',
        // header já definido em apiFetch
        reqBody: messageData,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('sendUserMessage', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no contactService.sendUserMessage', { cause });
  }
}

async function getMessagesByUserId(userId) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getMessagesByUserId) {
        await fakeApiError('mockFn com err = true no getMessagesByUserId do contactService');
      }

      // Simulação do backend
      const userMessages = messages.filter((message) => message.owner === userId);

      // Caso não existam mensagens o retorno é []; não é um erro, e é direcionado no próprio componente

      return await fakeApi(userMessages);
    };

    const apiFn = async () => {
      return await apiFetch(`/messages/:${userId}`);
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('getMessagesByUserId', data);
    return Array.isArray(data) ? data : [];
  } catch (cause) {
    throw new Error('Falha no contactService.getMessagesByUserId', { cause });
  }
}

export { sendUserMessage, getMessagesByUserId };

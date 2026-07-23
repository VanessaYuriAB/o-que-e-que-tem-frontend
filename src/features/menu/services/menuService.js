import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import { itemsMenu } from '../../../mocks/fakeMenuDb.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import apiFetch from '../../../services/api.js';

export async function getMenu() {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getMenu) {
        await fakeApiError('mockFn com err = true no getMenu do menuService'); // Promise.reject envia para o bloco catch
      }

      // Teste de polling: simula mudança no estoque depois que a aplicação já carregou
      setTimeout(() => {
        itemsMenu[3].qtyAvailable = 5;

        console.log('Mandioca atualizada para 5');
      }, 10000);

      return await fakeApi({ itemsMenu });
    };

    const apiFn = async () => {
      return await apiFetch('/menu'); // sem parâmetros de 'options' pq é um GET
    };

    const { data } = await decideMockOrApi(mockFn, apiFn); // pq a resposta é configurada como { data: ..., status: ... }, tanto em fakeApi quando em api

    console.log('getMenu:', data);
    return Array.isArray(data?.itemsMenu) ? data.itemsMenu : [];
  } catch (cause) {
    // Erro HTTP ou de rede
    // Mantém erros originais da apiFetch (ou fakes), adicionando contexto - cause tem type, status e data/message; o contexto está na mensagem
    throw new Error('Falha no getMenu', { cause });
  }
}

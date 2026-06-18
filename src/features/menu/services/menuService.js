import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import apiFetch from '../../../services/api.js';
import { itemsMenu } from '../../../mocks/fakeMenuDb.js';

export async function getMenu() {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getMenu) {
        await fakeApiError('mockFn com err = true no getMenu do menuService');
        // Promise.reject envia para o bloco catch
      }

      const { data } = await fakeApi({ itemsMenu });

      console.log('Menu:', data);
      return Array.isArray(data?.itemsMenu) ? data.itemsMenu : [];
    };

    const apiFn = async () => {
      // Sem parâmetros de 'options' pq é um GET
      const { data } = await apiFetch('/menu'); // pq a resposta é configurada como { data: ..., status: ... }

      console.log('Menu:', data);
      return Array.isArray(data?.itemsMenu) ? data.itemsMenu : [];
    };

    return await decideMockOrApi(mockFn, apiFn);
  } catch (cause) {
    // Erro HTTP ou de rede
    // Mantém erros originais da apiFetch (ou fakes), adicionando contexto - cause tem type, status e data/message; o contexto está na mensagem
    throw new Error('Falha no getMenu', { cause });
  }
}

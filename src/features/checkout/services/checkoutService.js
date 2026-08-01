import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';

async function sendOrderToServer(order) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.sendOrderToServer) {
        await fakeApiError('mockFn com err = true no sendOrderToServer do checkoutService');
      }

      // Seta persistência
      localStorage.setItem('successOrder', JSON.stringify(order));

      return await fakeApi(order, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/orders', {
        method: 'POST',
        reqBody: order,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('checkoutService/sendOrderToServer:', data);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no checkoutService.sendOrderToServer', { cause });
  }
}

export default sendOrderToServer;

/*

(alterar, tbm, campo de infos adicionais)

redirecionamento para sucesso com infos do pedido > order precisa de um id, nº de pedido? > almoço ou janta, horário de retirada ou entrega?

refatorar classes como componente à parte, ex: cart__pack-card-link-box

separar forms de Cart e Checkout, jsx e css

ajustar botão Subscription em active, no Profile em mobile

refatoração auth, user e subscription (ver roteiro) > renomear refresh() para refreshMe() ou getCurrentUser()

*/

/*

USERPROFILE.JSX e SUBSCRIPTIONPROFILE.JSX

hooks useProfile será usado? ou manter no component? hook para validação de tds os forms (estes + login e register)?

msg de erro, ex: 401, deixar como está no handler, alterar a msg ou repassar a msg do service?

limpar msgs com efeito?

*/

/*

APP.JSX

PROFILE > PARA IMPLEMENTAR INFOS DO USUÁRIO > DEPOIS FAZER REFRESH E TOKEN JWT POR HTTPONLY > erros globais de refresh em Layout? Loading tbm?

IMPLEMENTAR REFRESH COMPLETO > PRIMEIRO AUTHBOOTSTRAP E DEPOIS USERDATA PARA PERFIL? COM HOOKS E EFEITOS INTERNOS? OU APENAS UM EFEITO EM APP.JSX POR CAUSA DO STORE QUE É GLOBAL?

VALIDAÇÃO, RESET E ENVIO DE FORMS > VER ROTEIRO > useform

*/

/*

padronizar em e rem ! em para paddings de componentes pequenos e rem para espaçamentos em blocos maiores? gaps tbm?

padronizar cores (unidade/medida)

padronizar semântica de components reutilizáveis, Button, Loader, Toast > estão em divs?

unificar css para formulários?

*/

/*

REAMDE: "Por se tratar de um MVP para fins educacionais e de portfólio, o processamento de pagamentos não foi integrado a um gateway real. Os campos de pagamento possuem apenas finalidade demonstrativa."

MELHORIA:
- Cart: botão para finalizar e cadastrar-se, caso ainda não seja cadastrado
- Refatorar para diversos pedidos em uma order

*/

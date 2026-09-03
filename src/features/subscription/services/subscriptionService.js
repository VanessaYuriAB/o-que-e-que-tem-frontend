import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import apiFetch from '../../../services/api.js';
import useAuthStore from '../../../store/useAuthStore.js';

export default async function subscribe(newSubscriptionData) {
  try {
    const mockFn = async () => {
      const user = useAuthStore.getState().user;

      if (FAKE_ERRORS.subscribe) {
        await fakeApiError('mockFn com err = true no subscribe do subscribeService');
      }

      // Ajusta dados
      const createdAt = new Date().toLocaleString('pt-BR');

      const months =
        newSubscriptionData.howLong === 'two'
          ? 2
          : newSubscriptionData.howLong === 'four'
            ? 4
            : newSubscriptionData.howLong === 'six'
              ? 6
              : 12;

      const end = new Date(createdAt);
      end.setMonth(end.getMonth() + months);

      // Define mock (mantendo dados de endereço, caso assinatura seja feita sem)
      const mockSubscribe = {
        _id: user._id ?? 'user-mock',

        userName: newSubscriptionData.userName,
        email: newSubscriptionData.email,
        confirmEmail: newSubscriptionData.confirmEmail,
        tel: newSubscriptionData.tel,

        cep: newSubscriptionData.cep ?? user.cep,
        address: newSubscriptionData.address ?? user.address,
        number: newSubscriptionData.number ?? user.number,
        complement: newSubscriptionData.complement ?? user.complement,
        district: newSubscriptionData.district ?? user.district,

        infoText: newSubscriptionData.infoText,

        subscription: true,

        subscriptionDetails: {
          howLong: newSubscriptionData.howLong,
          daysOn: newSubscriptionData.daysOn,
          schedules: newSubscriptionData.schedules,
          method: newSubscriptionData.method,
          pay: newSubscriptionData.pay,

          owner: user._id ?? 'user-mock',
          status: true,
          begin: createdAt,
          end: end.toLocaleString('pt-BR'),
        },
      };

      // Ajusta persistência
      localStorage.setItem('mockUser', JSON.stringify(mockSubscribe));

      // Retorna dados (201)
      return await fakeApi(mockSubscribe, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/subscribe', {
        method: 'POST',
        // header definido em apiFetch
        reqBody: newSubscriptionData,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('subscriptionService/subscribe:', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no subscriptionService.subscribe', { cause });
  }
}

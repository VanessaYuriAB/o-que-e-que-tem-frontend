import errorHandler from '../../../shared/utils/errorHandler.js';
import { subscribe, sendSubscriptionOrderToServer } from '../services/subscriptionService.js';
import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';
import { updateUserProfile } from '../../profile/services/profileService.js';

function useSubscription(isUser) {
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const [loadingSendSubscribeOrder, setLoadingSendSubscribeOrder] = useState(false);
  const [localErrorSendSubscribeOrder, setLocalErrorSendSubscribeOrder] = useState(null);

  const { setUserAction, setGlobalErrorAction, loginAction, registerAction } =
    useAuthStore.getState();

  async function sendSubscribe(data) {
    setLoading(true);
    setLocalError(null);

    setGlobalErrorAction(null);

    // Payload para cadastro, caso necessário
    const registerData = {
      userName: data.userName,
      email: data.email,
      confirmEmail: data.confirmEmail,
      tel: data.tel,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    // Payload para login, caso necessário
    const loginData = {
      email: data.email,
      tel: data.tel,
      password: data.password,
    };

    // Payload para atualização de perfil cadastral
    // Com verificação de campos, para ñ sobrescrever dados, caso já existam cadastrado no servidor
    const userProfileData = {
      userName: data.userName,
      email: data.email,
      tel: data.tel,

      address: data.address,
      number: data.number,
      complement: data.complement,
      district: data.district,
      cep: data.cep,
      infoText: data.infoText,
    };

    const addressFields = ['cep', 'address', 'number', 'complement', 'district'];
    addressFields.forEach((field) => {
      if (userProfileData[field] === '') {
        delete userProfileData[field];
      }
    });

    // Payload para assinatura
    // Com dados gerais (exceto senha), pq o service atualiza e retorna o objeto completo de 'user', contendo os dados de assinatura - dados de endereço são gerenciados no próprio service (para mock) - para persistência real no backend, os dados não são utilizados
    const subscribeData = { ...data };
    delete subscribeData.password;
    delete subscribeData.confirmPassword;

    try {
      // Se não houver usuário logado
      if (!isUser) {
        // Verifica se já existe cadastro
        // Tenta logar
        const loginResult = await loginAction(loginData);

        // Se insucesso
        if (!loginResult.success) {
          // Realiza o cadastro do usuário
          const registerResult = await registerAction(registerData);

          if (!registerResult.success) {
            throw registerResult.error;
          }

          // Depois loga
          const loginResult = await loginAction(loginData);

          if (!loginResult.success) {
            throw loginResult.error;
          }
        }
      }

      // Neste ponto, o usuário já está logado

      // Atualiza dados do usuário
      // Usando service, não hook, pq o set global é definido aqui no próprio hook de assinatura
      await updateUserProfile(userProfileData);

      // Então, inscreve assinatura
      const subscriptionData = await subscribe(subscribeData);

      // E seta 'user' (global)
      setUserAction(subscriptionData);
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setLocalError(handledError);
      }

      throw handledError;
    } finally {
      setLoading(false);
    }
  }

  async function sendSubscribeOrder(subscriptionOrder) {
    setLoadingSendSubscribeOrder(true);
    setLocalErrorSendSubscribeOrder(null);

    setGlobalErrorAction(null);

    try {
      const data = await sendSubscriptionOrderToServer(subscriptionOrder);
      return { success: true, data };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setLocalErrorSendSubscribeOrder(handledError); // obj puro para o estado, contendo: msg, scope, status e action
      }

      return { success: false };
    } finally {
      setLoadingSendSubscribeOrder(false);
    }
  }

  return {
    sendSubscribe,
    loading,
    localError,
    sendSubscribeOrder,
    loadingSendSubscribeOrder,
    localErrorSendSubscribeOrder,
  };
}

export default useSubscription;

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

    const dataWithVerifiedAddress = { ...data };

    const addressFields = ['cep', 'address', 'number', 'complement', 'district'];

    addressFields.forEach((field) => {
      if (dataWithVerifiedAddress[field] === '') {
        delete dataWithVerifiedAddress[field];
      }
    });

    const dataWithoutPassword = { ...dataWithVerifiedAddress };

    delete dataWithoutPassword.password;
    delete dataWithoutPassword.confirmPassword;

    try {
      // Se não houver usuário logado
      if (!isUser) {
        // Verifica se já existe cadastro
        // Tenta logar
        const loginResult = await loginAction(dataWithVerifiedAddress);

        // Se insucesso
        if (!loginResult.success) {
          // Realiza o cadastro do usuário
          const registerResult = await registerAction(dataWithVerifiedAddress);

          if (!registerResult.success) {
            throw registerResult.error;
          }

          // Depois loga
          const loginResult = await loginAction(dataWithVerifiedAddress);

          if (!loginResult.success) {
            throw loginResult.error;
          }
        }
      }

      // Neste ponto, o usuário já está logado

      // Atualiza dados do usuário
      await updateUserProfile(dataWithoutPassword);

      // Então, inscreve assinatura
      const subscriptionData = await subscribe(dataWithoutPassword);

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

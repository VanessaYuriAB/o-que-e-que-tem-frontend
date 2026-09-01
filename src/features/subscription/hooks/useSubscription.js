import errorHandler from '../../../shared/utils/errorHandler.js';
import subscribe from '../services/subscriptionService.js';
import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';
import * as profileService from '../../profile/services/profileService.js';

export default function useSubscription(isUser) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { /*setUserAction,*/ setGlobalErrorAction, loginAction, registerAction } =
    useAuthStore.getState();

  async function sendSubscribe(data) {
    setLoading(true);
    setError(null);

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
      await profileService.updateUserProfile(dataWithoutPassword);

      // Então, inscreve assinatura
      await subscribe(dataWithoutPassword);
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setError(handledError);
      }

      throw handledError;
    } finally {
      setLoading(false);
    }
  }

  return { sendSubscribe, loading, error };
}

import errorHandler from '../../../shared/utils/errorHandler.js';
import subscribe from '../services/subscriptionService.js';
import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';

export default function useSubscription(isUser) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginAction = useAuthStore((state) => state.loginAction);
  const registerAction = useAuthStore((state) => state.registerAction);
  const updateUserAction = useAuthStore((state) => state.updateUserAction);
  /*const updateSubscriptionAction = useAuthStore((state) => state.updateSubscriptionAction);*/

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
      // Se houver usuário logado
      if (isUser) {
        // Atualiza dados do usuário
        const updateProfileResult = await updateUserAction(dataWithoutPassword);

        if (!updateProfileResult.success) {
          console.log(updateProfileResult.error);
          throw updateProfileResult.error;
        }
      }

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

        // Se ok, atualiza dados cadastrais
        const updateProfileResult = await updateUserAction(dataWithoutPassword);

        if (!updateProfileResult.success) {
          throw updateProfileResult.error;
        }
      }

      // Então, inscreve assinatura (qdo chega aqui em subscribe(), o usuário já está, necessariamente, logado)
      await subscribe(dataWithVerifiedAddress);
    } catch (error) {
      const handledError = errorHandler(error);
      setError(handledError);
      throw handledError;
    } finally {
      setLoading(false);
    }
  }

  return { sendSubscribe, loading, error };
}

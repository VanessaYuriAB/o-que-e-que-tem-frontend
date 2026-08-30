import errorHandler from '../../../shared/utils/errorHandler.js';
import { login, register } from '../../auth/services/authService.js';
import { updateUserProfile } from '../../profile/services/profileService.js';
import subscribe from '../services/subscriptionService.js';
import { useState } from 'react';

export default function useSubscription(isUser) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendSubscribe(data) {
    setLoading(true);
    setError(null);

    const userProfileData = { ...data };

    const addressFields = ['cep', 'address', 'number', 'complement', 'district'];

    addressFields.forEach((field) => {
      if (userProfileData[field] === '') {
        delete userProfileData[field];
      }
    });

    try {
      if (isUser) {
        // Atualiza dados do usuário
        await updateUserProfile(userProfileData);
        // Envia assinatura
        await subscribe(data);
        return;
      }

      // Se não houver usuário logado
      // Verifica se já existe cadastro

      try {
        // Loga
        await login(data);
        // Se ok, atualiza dados cadastrais
        await updateUserProfile(userProfileData);
      } catch (error) {
        console.log('sendSubscribe', error.cause.status);

        // Se não
        if (error.cause.status === 401) {
          // Realiza o cadastro do usuário
          await register(data);
          // Depois loga
          await login(data);
        }
      }

      // Para ambos (usuário logado ou não)
      // Inscreve assinatura
      await subscribe(data);
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

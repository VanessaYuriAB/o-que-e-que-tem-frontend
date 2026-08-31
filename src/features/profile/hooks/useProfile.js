import { useState } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import * as profileService from '../services/profileService.js';
import useAuthStore from '../../../store/useAuthStore.js';

export default function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const { setUserAction, setGlobalErrorAction } = useAuthStore.getState();

  async function updateUser(profileFormData) {
    setLoading(true);
    setError(null);

    try {
      const updatedUserData = await profileService.updateUserProfile(profileFormData);

      // Seta 'user' (global)
      setUserAction(updatedUserData);

      // Se bem sucedido, define msg de sucesso
      setConfirmAction('Perfil atualizado');
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setError(handledError.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    setError,
    confirmAction,
    setConfirmAction,
    updateUser,
  };
}

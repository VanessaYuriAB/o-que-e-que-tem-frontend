import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';
import errorHandler from '../../../shared/utils/errorHandler.js';
import sendUserMessage from '../services/contactService.js';

function useContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setGlobalErrorAction } = useAuthStore.getState();

  async function sendMsg(msgData, userId) {
    setLoading(true);
    setError(null);

    setGlobalErrorAction(null);

    try {
      await sendUserMessage(msgData, userId);

      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setError(handledError);
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return { sendMsg, loading, error };
}

export default useContact;

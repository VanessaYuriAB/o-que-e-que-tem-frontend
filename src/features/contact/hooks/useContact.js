import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';
import errorHandler from '../../../shared/utils/errorHandler.js';
import sendUserMessage from '../services/contactService.js';

function useContact() {
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const { setGlobalErrorAction } = useAuthStore.getState();

  async function sendMsg(msgData, userId) {
    setLoading(true);
    setLocalError(null);

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
        setLocalError(handledError);
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return { sendMsg, loading, localError };
}

export default useContact;

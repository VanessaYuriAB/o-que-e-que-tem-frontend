import { useState, useCallback } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';
import errorHandler from '../../../shared/utils/errorHandler.js';
import { sendUserMessage, getMessagesByUserId } from '../services/contactService.js';

export default function useContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userMsgs, setUserMsgs] = useState([]);

  const { setGlobalErrorAction } = useAuthStore.getState();

  async function sendMsg(msgData) {
    setLoading(true);
    setError(null);

    setGlobalErrorAction(null);

    try {
      await sendUserMessage(msgData);
      setSuccess(
        `Mensagem enviada :) Retornaremos em breve, pelo seu ${msgData.method === 'email-radio' ? 'e-mail' : 'WhatsApp'}.`
      );
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

  const getUserMsgs = useCallback(
    async (userId) => {
      setLoading(true);
      setError(null);
      setUserMsgs([]);

      setGlobalErrorAction(null);

      try {
        const msgs = await getMessagesByUserId(userId);
        setUserMsgs(msgs);

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
    },
    [setGlobalErrorAction]
  );

  return { sendMsg, loading, error, success, getUserMsgs, userMsgs };
}

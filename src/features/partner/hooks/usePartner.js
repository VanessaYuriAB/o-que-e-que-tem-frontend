import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';
import errorHandler from '../../../shared/utils/errorHandler.js';
import sendPartnerEntry from '../services/partnerService.js';

function usePartner() {
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { setGlobalErrorAction } = useAuthStore.getState();

  async function enrollPartner(partnerData) {
    setLoading(true);
    setLocalError(null);
    setSuccess(false);

    setGlobalErrorAction(null);

    try {
      await sendPartnerEntry(partnerData);
      setSuccess(true);
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setLocalError(handledError);
      }

      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return { loading, localError, success, enrollPartner };
}

export default usePartner;

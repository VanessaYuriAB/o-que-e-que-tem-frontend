import { useState, useCallback } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import * as profileService from '../services/profileService.js';
import useAuthStore from '../../../store/useAuthStore.js';

function useProfile() {
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const [userAllOrders, setUserAllOrders] = useState([]);
  const [loadingAllOrders, setLoadingAllOrders] = useState(false);
  const [localErrorAllOrders, setLocalErrorAllOrders] = useState(null);

  const [userMsgs, setUserMsgs] = useState([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [localErrorMsgs, setLocalErrorMsgs] = useState(null);

  const { setUserAction, setGlobalErrorAction } = useAuthStore.getState();

  async function updateUser(profileFormData) {
    setLoading(true);
    setLocalError(null);

    setGlobalErrorAction(null);

    try {
      const updatedUserData = await profileService.updateUserProfile(profileFormData);

      // Seta 'user' (global)
      setUserAction(updatedUserData);

      // Se bem sucedido, retorna status de sucesso
      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setLocalError(handledError);
      }

      // Se não sucedido, retorna status de insucesso
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  async function updateSubscription(profileFormData) {
    setLoading(true);
    setLocalError(null);

    setGlobalErrorAction(null);

    try {
      const updatedSubscriptionData =
        await profileService.updateSubscriptionProfile(profileFormData);

      // Setar 'user' (global)
      setUserAction(updatedSubscriptionData);

      // Retorna status de sucesso
      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setLocalError(handledError);
      }

      // Retorna status de insucesso
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  // OrdersProfile (consumido em efeito)
  const getUserAllOrders = useCallback(
    async (userId) => {
      setLoadingAllOrders(true);
      setLocalErrorAllOrders(null);
      setUserAllOrders([]);

      setGlobalErrorAction(null);

      try {
        const orders = await profileService.getOrdersByUserId(userId);
        const subscriptionOrders = await profileService.getSubscriptionOrdersByUserId(userId);

        const allOrders = [...orders, ...subscriptionOrders];

        setUserAllOrders(allOrders);
      } catch (error) {
        const handledError = errorHandler(error);

        setUserAllOrders([]);

        if (handledError.scope === 'global') {
          // Seta 'globalError' (global)
          setGlobalErrorAction(handledError);
        } else if (handledError.scope === 'local') {
          setLocalErrorAllOrders(handledError);
        }
      } finally {
        setLoadingAllOrders(false);
      }
    },
    [setGlobalErrorAction]
  );

  // MsgsProfile (consumido em efeito)
  const getUserMsgs = useCallback(
    async (userId) => {
      setLoadingMsgs(true);
      setLocalErrorMsgs(null);
      setUserMsgs([]);

      setGlobalErrorAction(null);

      try {
        const msgs = await profileService.getMessagesByUserId(userId);
        setUserMsgs(msgs);
      } catch (error) {
        const handledError = errorHandler(error);

        setUserMsgs([]);

        if (handledError.scope === 'global') {
          // Seta 'globalError' (global)
          setGlobalErrorAction(handledError);
        } else if (handledError.scope === 'local') {
          setLocalErrorMsgs(handledError);
        }
      } finally {
        setLoadingMsgs(false);
      }
    },
    [setGlobalErrorAction]
  );

  return {
    loading,
    localError,
    setLocalError,
    updateUser,
    updateSubscription,
    userAllOrders,
    loadingAllOrders,
    localErrorAllOrders,
    getUserAllOrders,
    userMsgs,
    loadingMsgs,
    localErrorMsgs,
    getUserMsgs,
  };
}

export default useProfile;

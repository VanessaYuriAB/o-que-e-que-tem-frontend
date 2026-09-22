import { useState, useCallback } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import * as profileService from '../services/profileService.js';
import useAuthStore from '../../../store/useAuthStore.js';

export default function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const [userAllOrders, setUserAllOrders] = useState(null);
  const [loadingAllOrders, setLoadingAllOrders] = useState(false);
  const [errorAllOrders, setErrorAllOrders] = useState(null);

  const { setUserAction, setGlobalErrorAction } = useAuthStore.getState();

  async function updateUser(profileFormData) {
    setLoading(true);
    setError(null);
    setConfirmAction(null);

    setGlobalErrorAction(null);

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

  async function updateSubscription(profileFormData, action) {
    setLoading(true);
    setError(null);
    setConfirmAction(null);

    setGlobalErrorAction(null);

    try {
      const updatedSubscriptionData =
        await profileService.updateSubscriptionProfile(profileFormData);

      // Setar 'user' (global)
      setUserAction(updatedSubscriptionData);

      // Se bem sucedido, define msg de sucesso conforme action
      if (action === 'send') {
        setConfirmAction('Assinatura atualizada');
      }

      if (action === 'pause') {
        setConfirmAction('Assinatura pausada');
      }

      if (action === 'retake') {
        setConfirmAction('Assinatura retomada');
      }
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

  // OrdersProfile (consumido em efeito)
  const getUserAllOrders = useCallback(async (userId) => {
    setLoadingAllOrders(true);
    setErrorAllOrders(null);

    try {
      const orders = await profileService.getOrdersByUserId(userId);
      const subscriptionOrders = await profileService.getSubscriptionOrdersByUserId(userId);

      const allOrders = [...orders, ...subscriptionOrders];

      setUserAllOrders(allOrders);
    } catch (error) {
      const handledError = errorHandler(error);

      setUserAllOrders(null);
      setErrorAllOrders(handledError);
    } finally {
      setLoadingAllOrders(false);
    }
  }, []);

  return {
    loading,
    error,
    setError,
    confirmAction,
    setConfirmAction,
    updateUser,
    updateSubscription,
    userAllOrders,
    loadingAllOrders,
    errorAllOrders,
    getUserAllOrders,
  };
}

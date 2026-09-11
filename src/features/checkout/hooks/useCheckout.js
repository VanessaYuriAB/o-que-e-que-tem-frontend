import { useState } from 'react';
import { sendOrderToServer, sendSubscriptionOrderToServer } from '../services/checkoutService.js';
import errorHandler from '../../../shared/utils/errorHandler.js';

export default function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendOrder(order) {
    setLoading(true);
    setError(null);

    try {
      const data = await sendOrderToServer(order);
      return { success: true, data };
    } catch (error) {
      const handledError = errorHandler(error);
      setError(handledError); // obj puro para o estado, contendo: msg, scope, status e action
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  async function sendSubscribeOrder(subscriptionOrder) {
    setLoading(true);
    setError(null);

    try {
      const data = await sendSubscriptionOrderToServer(subscriptionOrder);
      return { success: true, data };
    } catch (error) {
      const handledError = errorHandler(error);
      setError(handledError); // obj puro para o estado, contendo: msg, scope, status e action
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, sendOrder, sendSubscribeOrder };
}

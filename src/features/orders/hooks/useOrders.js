import { useState } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import { getOrderByNumber, sendOrderToServer } from '../services/ordersService.js';
import { getSubscriptionOrderByNumber } from '../../subscription/services/subscriptionService.js';
import useAuthStore from '../../../store/useAuthStore.js';

function useOrders() {
  const [orderTracked, setOrderTracked] = useState(null);
  const [loadingTracker, setLoadingTracker] = useState(false);
  const [localErrorTracker, setLocalErrorTracker] = useState(null);

  const [loadingSendOrder, setLoadingSendOrder] = useState(false);
  const [localErrorSendOrder, setLocalErrorSendOrder] = useState(null);

  const { setGlobalErrorAction } = useAuthStore.getState();

  // OrderTracking
  const trackOrder = async (orderData) => {
    setLoadingTracker(true);
    setLocalErrorTracker(null);

    setGlobalErrorAction(null);

    try {
      let result;

      if (orderData.orderNumber.startsWith('2')) {
        result = await getOrderByNumber(orderData);
      } else if (orderData.orderNumber.startsWith('S')) {
        result = await getSubscriptionOrderByNumber(orderData);
      }

      setOrderTracked(result);

      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);

      setOrderTracked(null);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setLocalErrorTracker(handledError);
      }

      return { success: false };
    } finally {
      setLoadingTracker(false);
    }
  };

  // Checkout
  async function sendOrder(order) {
    setLoadingSendOrder(true);
    setLocalErrorSendOrder(null);

    setGlobalErrorAction(null);

    try {
      const data = await sendOrderToServer(order);

      return { success: true, data };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setLocalErrorSendOrder(handledError); // obj puro para o estado, contendo: msg, scope, status e action
      }

      return { success: false };
    } finally {
      setLoadingSendOrder(false);
    }
  }

  return {
    orderTracked,
    loadingTracker,
    localErrorTracker,
    trackOrder,
    loadingSendOrder,
    localErrorSendOrder,
    sendOrder,
  };
}

export default useOrders;

import { useState } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import { getOrderByNumber, sendOrderToServer } from '../services/ordersService.js';
import { getSubscriptionOrderByNumber } from '../../subscription/services/subscriptionService.js';

export default function useOrders() {
  const [orderTracked, setOrderTracked] = useState(null);
  const [loadingTracker, setLoadingTracker] = useState(false);
  const [errorTracker, setErrorTracker] = useState(null);

  const [loadingSendOrder, setLoadingSendOrder] = useState(false);
  const [errorSendOrder, setErrorSendOrder] = useState(null);

  // OrderTracking
  const trackOrder = async (orderData) => {
    setLoadingTracker(true);
    setErrorTracker(null);

    try {
      let result;

      if (orderData.orderNumber.startsWith('2')) {
        result = await getOrderByNumber(orderData);
      } else if (orderData.orderNumber.startsWith('S')) {
        result = await getSubscriptionOrderByNumber(orderData);
      }

      setOrderTracked(result);
    } catch (error) {
      const handledError = errorHandler(error);

      setOrderTracked(null);
      setErrorTracker(handledError);
    } finally {
      setLoadingTracker(false);
    }
  };

  // Checkout
  async function sendOrder(order) {
    setLoadingSendOrder(true);
    setErrorSendOrder(null);

    try {
      const data = await sendOrderToServer(order);
      return { success: true, data };
    } catch (error) {
      const handledError = errorHandler(error);
      setErrorSendOrder(handledError); // obj puro para o estado, contendo: msg, scope, status e action
      return { success: false };
    } finally {
      setLoadingSendOrder(false);
    }
  }

  return {
    orderTracked,
    loadingTracker,
    errorTracker,
    trackOrder,
    loadingSendOrder,
    errorSendOrder,
    sendOrder,
  };
}

import { useState } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import { getOrderByNumber } from '../services/ordersService.js';
import { getSubscriptionOrderByNumber } from '../../subscription/services/subscriptionService.js';

export default function useOrders() {
  const [orderTracked, setOrderTracked] = useState(null);
  const [loadingTracker, setLoadingTracker] = useState(false);
  const [errorTracker, setErrorTracker] = useState(null);

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

  return {
    orderTracked,
    loadingTracker,
    errorTracker,
    trackOrder,
  };
}

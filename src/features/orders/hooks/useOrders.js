import { useState } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import { getOrderByNumber } from '../services/ordersService.js';

export default function useOrders() {
  const [orderTracked, setOrderTracked] = useState(null);
  const [loadingTracker, setLoadingTracker] = useState(false);
  const [errorTracker, setErrorTracker] = useState(null);

  const trackOrder = async (orderData) => {
    setLoadingTracker(true);
    setErrorTracker(null);

    try {
      const order = await getOrderByNumber(orderData);
      setOrderTracked(order);
    } catch (error) {
      const handledError = errorHandler(error);

      setOrderTracked(null);
      setErrorTracker(handledError);
    } finally {
      setLoadingTracker(false);
    }
  };

  return { orderTracked, loadingTracker, errorTracker, trackOrder };
}

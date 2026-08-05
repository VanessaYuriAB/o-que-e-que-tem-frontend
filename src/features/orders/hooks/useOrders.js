import { useState, useCallback } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import { getOrderByNumber, getOrderById } from '../services/ordersService.js';

export default function useOrders() {
  const [orderTracked, setOrderTracked] = useState(null);
  const [loadingTracker, setLoadingTracker] = useState(false);
  const [errorTracker, setErrorTracker] = useState(null);

  const [userOrders, setUserOrders] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState(null);

  // OrderTracking
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

  // OrdersProfile (consumido em efeito)
  const getUserOrders = useCallback(async (userId) => {
    setLoadingProfile(true);
    setErrorProfile(null);

    try {
      const orders = await getOrderById(userId);
      setUserOrders(orders);
    } catch (error) {
      const handledError = errorHandler(error);

      setUserOrders(null);
      setErrorProfile(handledError);
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  return {
    orderTracked,
    loadingTracker,
    errorTracker,
    trackOrder,
    userOrders,
    loadingProfile,
    errorProfile,
    getUserOrders,
  };
}

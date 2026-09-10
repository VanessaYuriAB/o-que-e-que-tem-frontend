import { useState, useCallback } from 'react';
import errorHandler from '../../../shared/utils/errorHandler.js';
import {
  getOrderByNumber,
  getOrderById,
  getSubscriptionOrderById,
  getSubscriptionOrderByNumber,
} from '../services/ordersService.js';

export default function useOrders() {
  const [orderTracked, setOrderTracked] = useState(null);
  const [loadingTracker, setLoadingTracker] = useState(false);
  const [errorTracker, setErrorTracker] = useState(null);

  const [userAllOrders, setUserAllOrders] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState(null);

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

  // OrdersProfile (consumido em efeito)
  const getUserAllOrders = useCallback(async (userId) => {
    setLoadingProfile(true);
    setErrorProfile(null);

    try {
      const orders = await getOrderById(userId);
      const subscriptionOrders = await getSubscriptionOrderById(userId);

      const allOrders = [...orders, ...subscriptionOrders];

      setUserAllOrders(allOrders);
    } catch (error) {
      const handledError = errorHandler(error);

      setUserAllOrders(null);
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
    userAllOrders,
    loadingProfile,
    errorProfile,
    getUserAllOrders,
  };
}

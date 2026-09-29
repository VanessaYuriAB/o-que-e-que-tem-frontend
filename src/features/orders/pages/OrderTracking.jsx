import useOrders from '../hooks/useOrders.js';
import OrderTrackingForm from './components/order-tracking-form/OrderTrackingForm.jsx';
import OrderTracked from './components/order-tracked/OrderTracked.jsx';
import './OrderTracking.css';

function OrderTracking() {
  const { orderTracked, loadingTracker, localErrorTracker, trackOrder } = useOrders();

  return (
    <section className="tracker tracker__content">
      <h1 className="tracker__title">Quer saber sobre um pedido feito?</h1>

      <OrderTrackingForm
        loadingTracker={loadingTracker}
        localErrorTracker={localErrorTracker}
        trackOrder={trackOrder}
      />

      {orderTracked && <OrderTracked orderTracked={orderTracked} />}
    </section>
  );
}

export default OrderTracking;

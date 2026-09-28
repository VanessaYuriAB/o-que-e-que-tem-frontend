import { Link } from 'react-router-dom';
import useAuthStore from '../../../../../store/useAuthStore.js';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import { useEffect } from 'react';
import useProfile from '../../../hooks/useProfile.js';
import OrdersProfileCard from './components/OrdersProfileCard.jsx';
import '../../../styles/profile-history.css';

function OrdersProfile() {
  const user = useAuthStore((state) => state.user);

  const { userAllOrders, loadingAllOrders, localErrorAllOrders, getUserAllOrders } = useProfile();

  useEffect(() => {
    getUserAllOrders(user._id);
  }, [user._id, getUserAllOrders]);

  if (loadingAllOrders) {
    return <Loader className="profile__orders-loader" />;
  }

  if (localErrorAllOrders) {
    return (
      <Toast
        className="profile__orders-toast profile-history__toast"
        message={localErrorAllOrders.message}
      />
    );
  }

  return (
    <section className="profile__orders profile-history__section">
      <h3 className="profile__orders-title">Histórico de pedidos</h3>

      {userAllOrders.length === 0 ? (
        <Toast className="profile__no-orders-toast profile-history__no-content-toast">
          <p className="profile__no-orders-text profile-history__no-content-text">
            Você ainda não comprou nenhuma sopa, creme ou patê...
          </p>
          <p className="profile__no-orders-text profile-history__no-content-text">
            Quer escolher os ingredientes para fazer seu primeiro pedido? :)
          </p>
          <Link className="profile__no-orders-link link-to-button" to="/menu">
            Ver cardápio
          </Link>
        </Toast>
      ) : (
        <OrdersProfileCard userAllOrders={userAllOrders} />
      )}
    </section>
  );
}

export default OrdersProfile;

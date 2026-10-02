import { Link } from 'react-router-dom';
import Button from '../../../../../shared/components/ui/button/Button.jsx';
import { useState } from 'react';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import useCartStore from '../../../../../store/useCartStore.js';
import { useShallow } from 'zustand/react/shallow';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import useAuthStore from '../../../../../store/useAuthStore.js';
import PackForm from '../pack-form/PackForm.jsx';
import styles from './PackCart.module.css';

function PackCart() {
  const [localRemovedError, setLocalRemovedError] = useState(null);

  const user = useAuthStore((state) => state.user);

  const {
    cartItems,
    removeItemToCartAction,
    removeLoading,
    setCartDataAction,
    setLoading, // loading da função de setar, não set de estado
    cartData,
  } = useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      removeItemToCartAction: state.removeItemToCartAction,
      removeLoading: state.removeLoading,
      setCartDataAction: state.setCartDataAction,
      setLoading: state.setLoading,
      cartData: state.cartData,
    }))
  );

  const [formData, setFormData] = useState({
    meal: cartData.meal || '',
    method: cartData.method || user?.subscriptionDetails?.method || '',
    userName: cartData.userName || user?.userName || '',
    email: cartData.email || user?.email || '',
    tel: cartData.tel || user?.tel || '',
    address: cartData.address || user?.address || '',
    number: cartData.number || user?.number || '',
    complement: cartData.complement || user?.complement || '',
    district: cartData.district || user?.district || '',
    cep: cartData.cep || user?.cep || '',
    infoText: cartData.infoText || user?.infoText || '',
  });

  const subtotal = formData.meal === 'pate' ? 35 : formData.meal === 'creme' ? 30 : 25;
  const total = formData.method === 'delivery' ? subtotal + 10 : subtotal;

  const typeOfMeal = formData.meal === 'pate' ? 'patê' : formData.meal;

  const handleRemoveItem = async (item) => {
    try {
      await removeItemToCartAction(item);
      setLocalRemovedError(null);
    } catch (error) {
      setLocalRemovedError(error.message);
    }
  };

  return (
    <section className={`${styles.pack} ${styles.cart__pack}`}>
      <h2 className={styles.pack__title}>Finalize seu pedido</h2>

      <div className={styles.pack__container}>
        <aside className={styles.pack__aside}>
          <section className={styles.pack__details}>
            <h3 className={styles['pack__details-title']}>Detalhes do pedido:</h3>

            <ul className={`${styles['pack__details-list']} list-reset`}>
              {cartItems.map((item) => {
                return (
                  <li className={styles['pack__details-item']} key={item._id}>
                    <div className={styles['pack__details-box']}>
                      <p className={styles['pack__details-product']}>{item.productName}</p>
                      <Button
                        className={styles['pack__details-button']}
                        type="button"
                        title="Remover item"
                        onClick={() => handleRemoveItem(item)}
                      ></Button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {removeLoading && (
              <Loader className={styles['pack__details-loader']}>Removendo item...</Loader>
            )}

            {localRemovedError && (
              <Toast className={styles['pack__details-toast']} message={localRemovedError}></Toast>
            )}

            <div className={styles['pack__details-link-box']}>
              <Link className={`${styles['pack__details-link']} link-to-button`} to="/menu">
                Voltar ao cardápio
              </Link>
            </div>

            <dl className={styles['pack__details-resume']}>
              <div className={styles['pack__details-line']}></div>
              <div className={styles['pack__details-box']}>
                <dt className={styles['pack__details-term']}>Tipo de refeição</dt>
                <dd className={styles['pack__details-description']}>
                  {formData.meal === '' ? '-' : typeOfMeal}
                </dd>
              </div>

              {user?.subscription !== true && (
                <>
                  <div className={styles['pack__details-line']}></div>
                  <div className={styles['pack__details-box']}>
                    <dt className={styles['pack__details-term']}>Subtotal</dt>
                    <dd className={styles['pack__details-description']}>R$ {subtotal},00</dd>
                  </div>
                  <div className={styles['pack__details-box']}>
                    <dt className={styles['pack__details-term']}>Entrega</dt>
                    <dd className={styles['pack__details-description']}>
                      R$ {formData.method === 'delivery' ? 10 : 0},00
                    </dd>
                  </div>
                  <div className={styles['pack__details-line']}></div>
                  <div className={styles['pack__details-box']}>
                    <dt className={styles['pack__details-term']}>Total</dt>
                    <dd className={styles['pack__details-description']}>R$ {total},00</dd>
                  </div>
                </>
              )}
            </dl>
            <p className={styles['pack__details-msg']}>Mais um pouco menos de desperdício :)</p>
          </section>
        </aside>

        <PackForm
          user={user}
          setFormData={setFormData}
          total={total}
          setCartDataAction={setCartDataAction}
          formData={formData}
          setLoading={setLoading}
          typeOfMeal={typeOfMeal}
        />
      </div>
    </section>
  );
}

export default PackCart;

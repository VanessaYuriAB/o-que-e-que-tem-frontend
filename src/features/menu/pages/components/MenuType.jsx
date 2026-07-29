import PropTypes from 'prop-types';
import Loader from '../../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useCartStore from '../../../../store/useCartStore.js';
import errorHandler from '../../../../shared/utils/errorHandler.js';
import { useShallow } from 'zustand/react/shallow';

import './MenuType.css';

function MenuType({ category }) {
  /* HOOKS PRIMEIRO, ANTES DE QLQR RETURN */

  const [activeItemId, setActiveItemId] = useState(null);

  const [localActionError, setLocalActionError] = useState(null);

  const { menuItems, loadingMenu, errorMenu } = useOutletContext();

  const { addItemToCartAction, loading, cartItems } = useCartStore(
    useShallow((state) => ({
      addItemToCartAction: state.addItemToCartAction,
      loading: state.loading,
      cartItems: state.cartItems,
    }))
  );

  // Verifica disponibilidade
  const availableMenuItems = useMemo(
    () => menuItems.filter((item) => item.qtyAvailable > 0),
    [menuItems]
  );

  console.log('Disponíveis:', availableMenuItems.length);

  // Ordem alfabética
  const orderedMenuItems = useMemo(
    () => [...availableMenuItems].sort((a, b) => a.productName.localeCompare(b.productName)),
    [availableMenuItems]
  );

  // Filtro por categoria
  const typeItems = useMemo(
    () =>
      category === 'todos'
        ? orderedMenuItems
        : orderedMenuItems.filter((item) => item.category === category),
    [orderedMenuItems, category]
  );

  // Handle
  const handleAddItem = async (item) => {
    try {
      setActiveItemId(item.inventoryLotId);

      await addItemToCartAction(item);

      setLocalActionError(null);
    } catch (error) {
      const handledError = errorHandler(error);

      setLocalActionError(handledError.message);
    } finally {
      setActiveItemId(null);
    }
  };

  /* EARLY RETURNS DEPOIS DE HOOKS */

  if (loadingMenu) {
    return <Loader />;
  }

  if (errorMenu) {
    return <Toast message={errorMenu.message} />;
  }

  /* RETURN: TODOS OU POR CATEGORIA */

  return (
    <section className="menu__section">
      <ul className="menu__section-list">
        {typeItems.map((item) => {
          const isItemAdded =
            cartItems?.some((cartItem) => cartItem.productName === item.productName) ?? false;

          return (
            <li className="menu__section-item" key={item.inventoryLotId}>
              <h3 className="menu__section-title">{item.productName}</h3>
              {category === 'todos' && <p className="menu__section-type">{item.category}</p>}

              {loading && activeItemId === item.inventoryLotId && (
                <Loader className="menu__section-loader">Adicionando item...</Loader>
              )}

              {localActionError && (
                <Toast className="menu__section-toast" message={localActionError}></Toast>
              )}

              <Button
                className={`menu__section-btn ${isItemAdded ? 'menu__section-btn_added' : ''}`}
                onClick={() => handleAddItem(item)}
                disabled={isItemAdded}
              >
                {isItemAdded ? 'ADICIONADO' : 'ADICIONAR'}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

MenuType.propTypes = {
  category: PropTypes.string,
};

export default MenuType;

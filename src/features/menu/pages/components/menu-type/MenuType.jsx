import PropTypes from 'prop-types';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import Button from '../../../../../shared/components/ui/button/Button.jsx';
import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useCartStore from '../../../../../store/useCartStore.js';
import { useShallow } from 'zustand/react/shallow';
import useAuthStore from '../../../../../store/useAuthStore.js';
import './MenuType.css';

function MenuType({ category }) {
  /* HOOKS PRIMEIRO, ANTES DE QLQR RETURN */

  const navigate = useNavigate();

  const [activeItemId, setActiveItemId] = useState(null);

  const [localItemError, setLocalItemError] = useState({
    id: null,
    message: null,
  });

  const { menuItems, loadingMenu, localErrorMenu } = useOutletContext();

  const { addItemToCartAction, loading, cartItems, removeItemToCartAction, removeLoading } =
    useCartStore(
      useShallow((state) => ({
        addItemToCartAction: state.addItemToCartAction,
        loading: state.loading,
        cartItems: state.cartItems,
        removeItemToCartAction: state.removeItemToCartAction,
        removeLoading: state.removeLoading,
      }))
    );

  const user = useAuthStore((state) => state.user);

  // Verifica disponibilidade
  const availableMenuItems = useMemo(
    () => menuItems.filter((item) => item.qtyAvailable > 0),
    [menuItems]
  );

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
  const handleToggleItem = async (item, isItemAdded) => {
    try {
      setActiveItemId(item._id);

      if (!isItemAdded) {
        await addItemToCartAction(item, user?._id);
      } else {
        await removeItemToCartAction(item);
      }

      setLocalItemError({
        id: null,
        message: null,
      });
    } catch (error) {
      setLocalItemError({
        id: item._id,
        message: error.message,
      });
    } finally {
      setActiveItemId(null);
    }
  };

  /* EARLY RETURNS DEPOIS DE HOOKS */

  if (loadingMenu) {
    return <Loader className="type__loader" />;
  }

  if (localErrorMenu) {
    return <Toast className="type__toast" message={localErrorMenu.message} />;
  }

  /* RETURN: TODOS OU POR CATEGORIA */

  return (
    <div className="type menu__type">
      <ul className="type__list">
        {typeItems.map((item) => {
          const isItemAdded =
            cartItems?.some((cartItem) => cartItem.productName === item.productName) ?? false;

          const removeText =
            removeLoading && activeItemId === item._id ? 'Removendo item...' : 'REMOVER';
          const addText =
            loading && activeItemId === item._id ? 'Adicionando item...' : 'ADICIONAR';

          return (
            <li className="type__item" key={item._id}>
              <article className="type__card">
                <h3 className="type__title">{item.productName}</h3>
                {category === 'todos' && <p className="type__category">{item.category}</p>}

                {localItemError.id === item._id && (
                  <Toast
                    className="type__toast type__toast_item"
                    message={localItemError.message}
                  ></Toast>
                )}

                <Button
                  className={`type__button ${isItemAdded ? 'type__button_added' : ''}`}
                  onClick={() => handleToggleItem(item, isItemAdded)}
                >
                  {isItemAdded ? removeText : addText}
                </Button>
              </article>
            </li>
          );
        })}
      </ul>
      <Button
        className="type__button type__button_pack"
        type="button"
        onClick={() => {
          navigate('/cart');
        }}
      >
        Navegar ao Carrinho de sopas, cremes ou patês... :)
      </Button>
    </div>
  );
}

MenuType.propTypes = {
  category: PropTypes.string,
};

export default MenuType;

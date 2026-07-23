import PropTypes from 'prop-types';
import Loader from '../../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import './MenuType.css';

function MenuType({ category }) {
  /* HOOKS PRIMEIRO, ANTES DE QLQR RETURN */
  const { menuItems, loading, error } = useOutletContext();

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

  /* EARLY RETURNS DEPOIS DE HOOKS */
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Toast message={error.message} />;
  }

  /* RETURN: TODOS OU POR CATEGORIA */

  return (
    <section className="menu__section">
      <ul className="menu__section-list">
        {typeItems.map((item) => {
          return (
            <li className="menu__section-item" key={item.inventoryLotId}>
              <h3 className="menu__section-title">{item.productName}</h3>

              {category === 'todos' && <p className="menu__section-type">{item.category}</p>}

              <Button className="menu__section-btn">ADICIONAR</Button>
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

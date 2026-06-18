import useMenu from '../../hooks/useMenu.js';
import PropTypes from 'prop-types';
import Loader from '../../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import { useMemo } from 'react';

import './MenuType.css';

function MenuType({ category }) {
  // HOOKS PRIMEIRO, ANTES DE QLQR RETURN

  const { menuItems, loading, error } = useMenu();

  // Ordem alfabética
  const orderedMenuItems = useMemo(
    () => [...menuItems].sort((a, b) => a.productName.localeCompare(b.productName)),
    [menuItems]
  );

  // Filtro por categoria
  const typeItems = useMemo(
    () =>
      category === 'todos'
        ? orderedMenuItems
        : orderedMenuItems.filter((item) => item.category === category),
    [orderedMenuItems, category]
  );

  // EARLY RETURNS DEPOIS DE HOOKS
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

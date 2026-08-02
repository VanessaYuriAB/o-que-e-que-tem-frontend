import './OrderTracking.css';
import Input from '../../../../shared/components/ui/input/Input.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import { Outlet } from 'react-router-dom';

function OrderTracking() {
  return (
    <section className="tracker tracker__content">
      <h1 className="tracker__title">Quer saber sobre um pedido feito?</h1>
      <form className="tracker__form">
        <fieldset className="tracker__field">
          <legend className="tracker__legend">Rastreamento de pedidos:</legend>
          <div className="tracker__input-box">
            <label className="tracker__label">Nº do pedido:</label>
            <Input className="tracker__input" />
          </div>
          <div className="tracker__input-box">
            <label className="tracker__label">E-mail:</label>
            <Input className="tracker__input" />
          </div>
          <Button className="tracker__button">Rastrear</Button>
        </fieldset>
      </form>

      <Outlet />
    </section>
  );
}

export default OrderTracking;

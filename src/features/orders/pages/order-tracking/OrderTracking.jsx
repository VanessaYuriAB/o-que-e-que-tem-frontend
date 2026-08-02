import './OrderTracking.css';
import Input from '../../../../shared/components/ui/input/Input.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import { Outlet } from 'react-router-dom';

function OrderTracking() {
  return (
    <section>
      <h1>Quer saber sobre um pedido feito?</h1>
      <form>
        <fieldset>
          <legend>Rastreamento de pedidos:</legend>
          <div>
            <label>Nº do pedido:</label>
            <Input />
          </div>
          <div>
            <label>e-mail:</label>
            <Input />
          </div>
          <Button>Rastrear</Button>
        </fieldset>
      </form>

      <Outlet />
    </section>
  );
}

export default OrderTracking;

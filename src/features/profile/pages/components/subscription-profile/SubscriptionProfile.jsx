import Button from '../../../../../shared/components/ui/button/Button.jsx';
import './SubscriptionProfile.css';

/* CASO SEJA ASSINANTE, RENDERIZA PERFIL DE ASSINATURA - CASO NÃO, RENDERIZA REDIRECIONAMENTO PARA ASSINATURA */

function SubscriptionProfile() {
  return (
    <section className="config-subscription profile__config-subscription">
      <p className="config-subscription__text">Status: </p>
      <p className="config-subscription__text">Início: </p>
      <p className="config-subscription__text">Fim: </p>

      <p className="config-subscription__text">Quais dias da semana: </p>
      <p className="config-subscription__text">Delivery ou drive-thru: </p>

      <p className="config-subscription__text">Próxima entrega em: </p>

      <Button className="config-subscription__button">Pausar</Button>
      <Button className="config-subscription__button">Editar</Button>
      <Button className="config-subscription__button">Enviar</Button>
    </section>
  );
}

export default SubscriptionProfile;

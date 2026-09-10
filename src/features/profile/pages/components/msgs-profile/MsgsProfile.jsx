import { Link } from 'react-router-dom';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import './MsgsProfile.css';

function MsgsProfile() {
  const hasMsgs = false;

  return (
    <section className="profile__msgs">
      <h3 className="profile__msgs-title">Histórico de mensagens</h3>

      {hasMsgs ? (
        <>
          <></>
        </>
      ) : (
        <Toast className="profile__no-msgs-toast">
          <p className="profile__no-msgs-text">Você ainda não nos enviou nenhuma mensagem.</p>
          <p className="profile__no-msgs-text">
            Pode nos enviar pelo link abaixo, se quiser. Costumamos responder rápido :)
          </p>
          <Link className="profile__no-msgs-link link-to-button" to="/talk-to-us">
            Fale conosco
          </Link>
        </Toast>
      )}
    </section>
  );
}

export default MsgsProfile;

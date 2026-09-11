import { Link } from 'react-router-dom';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import './MsgsProfile.css';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import { useEffect } from 'react';
import useContact from '../../../../contact/hooks/useContact.js';
import useAuthStore from '../../../../../store/useAuthStore.js';

function MsgsProfile() {
  const { loading, error, getUserMsgs, userMsgs } = useContact();

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    getUserMsgs(user._id);
  }, [user._id, getUserMsgs]);

  const hasMsgs = userMsgs.length > 0;

  if (loading) {
    return <Loader className="profile__msgs-loader" />;
  }

  if (error) {
    return <Toast className="profile__msgs-toast" message={error.message} />;
  }

  return (
    <section className="profile__msgs">
      <h3 className="profile__msgs-title">Histórico de mensagens</h3>

      {hasMsgs ? (
        <ul className="profile__msgs-list nav__list">
          {userMsgs.map((msg) => (
            <li className="profile__msgs-item" key={msg._id}>
              <dl className="profile__msgs-details">
                <div className="profile__msgs-item-box profile__msgs-item-box_center">
                  <dt className="profile__msgs-term">Data:</dt>
                  <dd className="profile__msgs-description">{msg.createdAt}</dd>
                </div>
                <div className="profile__msgs-item-box">
                  <dt className="profile__msgs-term">Mensagem:</dt>
                  <dd className="profile__msgs-description">{msg.message}</dd>
                </div>
                <div className="profile__msgs-item-box">
                  <dt className="profile__msgs-term">Forma de contato:</dt>
                  <dd className="profile__msgs-description">
                    {msg.method === 'email' ? msg.email : msg.whatsapp}
                  </dd>
                </div>
                <div className="profile__msgs-item-box">
                  <dt className="profile__msgs-term">Status:</dt>
                  <dd className="profile__msgs-description">
                    {msg?.status ? 'respondida' : 'pendente'}
                  </dd>
                </div>
                {msg?.status && (
                  <>
                    <div className="profile__msgs-item-box">
                      <dt className="profile__msgs-term">Em:</dt>
                      <dd className="profile__msgs-description">{msg.responseAt}</dd>
                    </div>
                    <div className="profile__msgs-item-box">
                      <dt className="profile__msgs-term">Resposta:</dt>
                      <dd className="profile__msgs-description">{msg.response}</dd>
                    </div>
                  </>
                )}
              </dl>
            </li>
          ))}
        </ul>
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

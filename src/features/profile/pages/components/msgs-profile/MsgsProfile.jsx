import { Link } from 'react-router-dom';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import { useEffect } from 'react';
import useProfile from '../../../hooks/useProfile.js';
import useAuthStore from '../../../../../store/useAuthStore.js';
import parsePtBrDate from '../../../utils/parsePtBrDate.js';
import '../../../styles/profile-history.css';

function MsgsProfile() {
  const { getUserMsgs, loadingMsgs, localErrorMsgs, userMsgs } = useProfile();

  const user = useAuthStore((state) => state.user);

  const orderedUserMsgs = userMsgs
    ? [...userMsgs].sort((a, b) => parsePtBrDate(b.createdAt) - parsePtBrDate(a.createdAt))
    : [];

  useEffect(() => {
    getUserMsgs(user._id);
  }, [user._id, getUserMsgs]);

  const hasMsgs = userMsgs.length > 0;

  if (loadingMsgs) {
    return <Loader className="profile__msgs-loader" />;
  }

  if (localErrorMsgs) {
    return (
      <Toast
        className="profile__msgs-toast profile-history__toast"
        message={localErrorMsgs.message}
      />
    );
  }

  return (
    <section className="profile__msgs profile-history__section">
      <h3 className="profile__msgs-title">Histórico de mensagens</h3>

      {hasMsgs ? (
        <ul className="profile__msgs-list profile-history__list nav__list">
          {orderedUserMsgs.map((msg) => {
            const formattedCreatedAt = new Date(msg.createdAt).toLocaleString('pt-BR');
            const msgCreatedAt = msg.createdAt.includes('T') ? formattedCreatedAt : msg.createdAt;

            return (
              <li className="profile__msgs-item" key={msg._id}>
                <dl className="profile__msgs-details profile-history__details">
                  <div className="profile__msgs-item-box profile__msgs-item-box_center profile-history__item-box profile-history__item-box_center">
                    <dt className="profile__msgs-term profile-history__term">Data:</dt>
                    <dd className="profile__msgs-description profile-history__description">
                      {msgCreatedAt}
                    </dd>
                  </div>
                  <div className="profile__msgs-item-box profile-history__item-box">
                    <dt className="profile__msgs-term profile-history__term">Mensagem:</dt>
                    <dd className="profile__msgs-description profile-history__description">
                      {msg.message}
                    </dd>
                  </div>
                  <div className="profile__msgs-item-box profile-history__item-box">
                    <dt className="profile__msgs-term profile-history__term">Forma de contato:</dt>
                    <dd className="profile__msgs-description profile-history__description">
                      {msg.method === 'email' ? msg.email : msg.whatsapp}
                    </dd>
                  </div>
                  <div className="profile__msgs-item-box profile-history__item-box">
                    <dt className="profile__msgs-term profile-history__term">Status:</dt>
                    <dd className="profile__msgs-description profile-history__description">
                      {msg?.status ? 'respondida' : 'pendente'}
                    </dd>
                  </div>
                  {msg?.status && (
                    <>
                      <div className="profile__msgs-item-box profile-history__item-box">
                        <dt className="profile__msgs-term profile-history__term">Em:</dt>
                        <dd className="profile__msgs-description profile-history__description">
                          {msg.responseAt}
                        </dd>
                      </div>
                      <div className="profile__msgs-item-box profile-history__item-box">
                        <dt className="profile__msgs-term profile-history__term">Resposta:</dt>
                        <dd className="profile__msgs-description profile-history__description">
                          {msg.response}
                        </dd>
                      </div>
                    </>
                  )}
                </dl>
              </li>
            );
          })}
        </ul>
      ) : (
        <Toast className="profile__no-msgs-toast profile-history__no-content-toast">
          <p className="profile__no-msgs-text profile-history__no-content-text">
            Você ainda não nos enviou nenhuma mensagem.
          </p>
          <p className="profile__no-msgs-text profile-history__no-content-text">
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

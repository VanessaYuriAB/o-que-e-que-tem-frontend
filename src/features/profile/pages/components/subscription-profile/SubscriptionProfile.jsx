import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import useAuthStore from '../../../../../store/useAuthStore.js';
import { Link } from 'react-router-dom';
import SubscriptionProfileForm from './components/SubscriptionProfileForm.jsx';
import './SubscriptionProfile.css';

function SubscriptionProfile() {
  const user = useAuthStore((state) => state.user);

  return (
    <section className="profile__subscription">
      <h3 className="profile__subscription-title">Opções da assinatura</h3>

      {/* Se usuário for assinante, renderiza página de perfil de assinatura; se não, renderiza link de redirecionamento para assinatura */}

      {user.subscription ? (
        <SubscriptionProfileForm user={user} />
      ) : (
        <Toast className="profile__no-subscription-toast">
          <p className="profile__no-subscription-title">Ainda não é um assinante e quer ser?</p>
          <Link className="profile__no-subscription-link link-to-button" to="/subscription">
            Assine agora :)
          </Link>
        </Toast>
      )}
    </section>
  );
}

export default SubscriptionProfile;

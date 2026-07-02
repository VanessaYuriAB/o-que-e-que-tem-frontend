import useAuthStore from '../../../store/useAuthStore';

import './Profile.css';

function Profile() {
  const user = useAuthStore((state) => state.user);

  console.log('Usuário em Profile:', user);

  return (
    <section>
      <h1>Olá, {user.userName}</h1>
    </section>
  );
}

export default Profile;

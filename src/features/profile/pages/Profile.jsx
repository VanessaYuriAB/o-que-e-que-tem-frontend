import useAuthStore from '../../../store/useAuthStore';

import './Profile.css';

function Profile() {
  const { user } = useAuthStore();

  console.log(user);

  return (
    <section>
      <h1>Olá, {user.userName}</h1>
    </section>
  );
}

export default Profile;

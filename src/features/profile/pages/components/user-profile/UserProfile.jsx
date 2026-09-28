import UserProfileForm from './components/UserProfileForm.jsx';

function UserProfile() {
  return (
    <section className="profile__user">
      <h3 className="profile__user-title">Seus dados cadastrais</h3>

      <UserProfileForm />
    </section>
  );
}

export default UserProfile;

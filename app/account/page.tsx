import ProfileForm from '../../components/MyProfile/ProfileForm';
import { getCurrentUser, getUserData } from '../../lib/user';

async function Account() {
  const user = await getCurrentUser();
  const userData = await getUserData(user.email);
  return <ProfileForm userEmail={user.email} user={userData!} />;
}
export default Account;

import ProfileForm from '../../components/MyProfile/ProfileForm';
import { getCurrentUser } from '../../lib/user';

async function Account() {
  const user = await getCurrentUser();
  return <ProfileForm userEmail={user.email} />;
}
export default Account;

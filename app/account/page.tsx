import { ProfileForm } from '@/components';
import { getCurrentUser, getUserData } from '@lib/user';
import { PersonalData } from '@interfaces/user.interface';

async function Account() {
  const user = await getCurrentUser();
  const userData = await getUserData(user.email);
  return <ProfileForm userEmail={user.email} user={userData || ({} as PersonalData)} />;
}

export default Account;

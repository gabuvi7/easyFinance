import { FirstLoginModal, MyProfile } from '../components';
import { getMonotributoInfo } from '../lib/afip';
import { getCurrentUser, getUserData } from '../lib/user';

async function App() {
  const user = await getCurrentUser();
  const userData = await getUserData(user.email);

  let afipData;
  if (userData?.monotributoCategory) {
    afipData = await getMonotributoInfo(userData?.monotributoCategory);
  }
  return (
    <>
      <MyProfile personalData={userData!} afipData={afipData} />
      <FirstLoginModal isOpen={userData!.firstLogin} email={userData!.email} />
    </>
  );
}
export default App;

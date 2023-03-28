import { MyProfile } from '../components';
import { getMonotributoInfo } from '../lib/afip';
import { getCurrentUser, getUserData } from '../lib/session';

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
    </>
  );
}
export default App;

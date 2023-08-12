import { DashboardTabs } from '@/components';
import { getCurrentUser } from '@lib/user';

async function Dashboard() {
  const user = await getCurrentUser();
  return (
    <>
      <DashboardTabs email={user.email} />
    </>
  );
}

export default Dashboard;

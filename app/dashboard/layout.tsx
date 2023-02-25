import { Metadata } from 'next';
import { ChildrenProps } from '../../utils/interfaces/children.interface';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'EasyFinance dashboard',
};

function DashboardLayout({ children }: ChildrenProps) {
  return <div>{children}</div>;
}
export default DashboardLayout;

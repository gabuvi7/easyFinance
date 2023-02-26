'use client';

import { Layout } from 'antd';
import { useAuthContext } from '../../context';
import { ChildrenProps } from '../../utils';

function GeneralLayout({ children }: ChildrenProps) {
  const user = useAuthContext();

  console.log(user);

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      {children}
    </Layout>
  );
}
export default GeneralLayout;

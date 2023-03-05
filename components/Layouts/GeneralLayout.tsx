'use client';

import { Layout } from 'antd';
import { ChildrenProps } from '../../utils';

function GeneralLayout({ children }: ChildrenProps) {
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      {children}
    </Layout>
  );
}
export default GeneralLayout;

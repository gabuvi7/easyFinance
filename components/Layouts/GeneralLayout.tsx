/* eslint-disable import/no-cycle */

'use client';

import { Layout } from 'antd';
import { ChildrenProps } from '../../utils';
import ClientOnly from '../ClientOnly/ClientOnly';

function GeneralLayout({ children }: ChildrenProps) {
  return (
    <ClientOnly>
      <Layout style={{ minHeight: '100vh' }} hasSider>
        {children}
      </Layout>
    </ClientOnly>
  );
}
export default GeneralLayout;

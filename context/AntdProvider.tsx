'use client';

import { ConfigProvider, theme } from 'antd';
import { ChildrenProps } from '../utils';

function AntdProvider({ children }: ChildrenProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: { colorPrimary: '#1890ff' },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;

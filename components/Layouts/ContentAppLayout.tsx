'use client';

import { Layout, theme } from 'antd';
import { ChildrenProps } from '../../utils';
import ThemeButton from '../ThemeButton/ThemeButton';

const { Header, Content, Footer } = Layout;

function ContentAppLayout({ children }: ChildrenProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="site-layout">
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <ThemeButton />
      </Header>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: 'center', background: colorBgContainer }}>Gabuvi7 ©2023</Footer>
    </Layout>
  );
}
export default ContentAppLayout;

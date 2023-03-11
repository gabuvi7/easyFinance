'use client';

import { Layout, Space, theme } from 'antd';
import { ChildrenProps } from '../../utils';
import ThemeButton from '../ThemeButton/ThemeButton';
import layoutStyles from './contentApp.module.css';
import DropdownUser from '../DropdownUser/DropdownUser';

const { Header, Content, Footer } = Layout;

function ContentAppLayout({ children }: ChildrenProps) {
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  return (
    <Layout style={{ background: colorBgContainer }} className="site-layout">
      <Header
        className={layoutStyles.headerLayout}
        style={{
          background: colorBgContainer,
        }}
      >
        <Space className={layoutStyles.headerSpace}>
          <DropdownUser />
        </Space>
        <Space>
          <ThemeButton />
        </Space>
      </Header>
      <Content
        className={layoutStyles.contentLayout}
        style={{
          background: colorBgContainer,
          color: colorText,
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: 'center', background: colorBgContainer }}>Gabuvi7 ©2023</Footer>
    </Layout>
  );
}
export default ContentAppLayout;

'use client';

import { Layout, Space, theme } from 'antd';
import { IChildrenSession } from '../../utils';
import ThemeButton from '../ThemeButton/ThemeButton';
import layoutStyles from './contentApp.module.css';
import DropdownUser from '../DropdownUser/DropdownUser';

const { Header, Content, Footer } = Layout;

function ContentAppLayout({ children, user }: IChildrenSession) {
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
        {user && (
          <Space className={layoutStyles.headerSpace}>
            <DropdownUser user={user} />
          </Space>
        )}
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

'use client';

import React, { useContext, useState } from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import ThemeButton from '../ThemeButton/ThemeButton';
import { ThemeContext } from '../../context';
import logo from '../../public/easyFinance-logo.svg';
import darkLogo from '../../public/easyFinance-dark-logo.svg';

const { Sider } = Layout;

const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

function Sidebar() {
  const { theme } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      theme={theme}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <ThemeButton />
      <Link className="flex items-center w-full px-3 mt-3" href="/">
        <Image src={theme === 'dark' ? darkLogo : logo} alt="EasyFinance logo" priority />
      </Link>
      <Menu theme={theme} mode="inline" defaultSelectedKeys={['4']} items={items} />
    </Sider>
  );
}
export default Sidebar;

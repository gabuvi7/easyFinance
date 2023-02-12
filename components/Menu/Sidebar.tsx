'use client';

import React, { useContext, useState } from 'react';

import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { HiChartPie } from 'react-icons/hi';
import { IoPersonCircleOutline, IoWallet } from 'react-icons/io5';
import { ThemeContext } from '../../context';
import logo from '../../public/easyFinance-logo.svg';
import darkLogo from '../../public/easyFinance-dark-logo.svg';
import { ICON_SIZE } from '../../utils';

const { Sider } = Layout;

function Sidebar() {
  const { theme } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);

  const Routes: MenuProps['items'] = [
    {
      key: '/dashboard',
      label: <Link href="/dashboard"> Dashboard</Link>,
      icon: <HiChartPie size={ICON_SIZE} />,
    },
    {
      key: '/billings',
      label: <Link href="/billings"> Billings</Link>,
      icon: <IoWallet size={ICON_SIZE} />,
    },
    {
      key: '/account',
      label: <Link href="/account"> Account</Link>,
      icon: <IoPersonCircleOutline size={ICON_SIZE} />,
    },
  ];

  return (
    <Sider
      theme={theme}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Link href="/">
        <Image
          style={{ display: 'flex' }}
          src={theme === 'dark' ? darkLogo : logo}
          alt="EasyFinance logo"
          priority
        />
      </Link>
      <Menu theme={theme} mode="inline" defaultSelectedKeys={['1']} items={Routes} />
    </Sider>
  );
}
export default Sidebar;

'use client';

import React, { useCallback, useContext, useState } from 'react';

import type { MenuProps } from 'antd';
import { Layout, Menu, theme as antTheme } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { HiChartPie, HiHome } from 'react-icons/hi';
import { IoPersonCircleOutline, IoWallet } from 'react-icons/io5';
import { ThemeContext } from '../../context';
import logo from '../../public/easyFinance-logo.svg';
import darkLogo from '../../public/easyFinance-dark-logo.svg';
import wallet from '../../public/wallet-logo.svg';
import { ICON_SIZE } from '../../utils';

const { Sider } = Layout;

function Sidebar() {
  const { theme } = useContext(ThemeContext);
  const {
    token: { colorTextQuaternary },
  } = antTheme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const Routes: MenuProps['items'] = [
    {
      key: '/',
      label: (
        <Link color={colorTextQuaternary} href="/">
          {' '}
          Home
        </Link>
      ),
      icon: <HiHome color={colorTextQuaternary} size={ICON_SIZE} />,
    },
    {
      key: '/dashboard',
      label: (
        <Link color={colorTextQuaternary} href="/dashboard">
          {' '}
          Dashboard
        </Link>
      ),
      icon: <HiChartPie color={colorTextQuaternary} size={ICON_SIZE} />,
    },
    {
      key: '/billings',
      label: (
        <Link color={colorTextQuaternary} href="/billings">
          {' '}
          Billings
        </Link>
      ),
      icon: <IoWallet color={colorTextQuaternary} size={ICON_SIZE} />,
    },
    {
      key: '/account',
      label: (
        <Link color={colorTextQuaternary} href="/account">
          {' '}
          Account
        </Link>
      ),
      icon: <IoPersonCircleOutline color={colorTextQuaternary} size={ICON_SIZE} />,
    },
  ];

  const HandleLogo = useCallback(() => {
    let logoToUse = darkLogo;
    if (collapsed)
      return <Image style={{ display: 'flex' }} src={wallet} alt="EasyFinance logo" priority />;
    if (theme === 'light') logoToUse = logo;
    return <Image style={{ display: 'flex' }} src={logoToUse} alt="EasyFinance logo" priority />;
  }, [theme, collapsed]);

  return (
    <Sider
      breakpoint="md"
      collapsedWidth="50"
      theme={theme}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      zeroWidthTriggerStyle={{ background: 'red' }}
    >
      <Link href="/">
        <HandleLogo />
      </Link>
      <Menu theme={theme} mode="inline" defaultSelectedKeys={['1']} items={Routes} />
    </Sider>
  );
}
export default Sidebar;

'use client';

/* eslint-disable react/no-unknown-property */
import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiChartPie } from 'react-icons/hi';
import { IoPersonCircleOutline, IoWallet } from 'react-icons/io5';
import logo from '../../public/easyFinance-logo.svg';
import darkLogo from '../../public/easyFinance-dark-logo.svg';
import { ICON_SIZE } from '../../utils';
import Navigator from '../Navigator/Navigator';
import ThemeButton from '../ThemeButton/ThemeButton';
import menuStyles from './menu.module.scss';
import { ThemeContext } from '../../context';

function Menu() {
  const { theme } = useContext(ThemeContext);

  const Routes = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      icon: <HiChartPie size={ICON_SIZE} />,
    },
    {
      path: '/billings',
      title: 'Billings',
      icon: <IoWallet size={ICON_SIZE} />,
    },
  ];
  const ProfileRoute = [
    {
      path: '/account',
      title: 'Account',
      icon: <IoPersonCircleOutline size={ICON_SIZE} />,
    },
  ];

  return (
    <div
      className={`bg-${
        theme === 'dark' ? 'gray-900' : 'gray-100'
      } hidden md:flex flex-col items-center w-70 overflow-hidden text-gray-400  rounded-r overflow-y-auto h-screen`}
    >
      <ThemeButton />
      <Link className="flex items-center w-full px-3 mt-3" href="/">
        <Image src={theme === 'dark' ? darkLogo : logo} alt="EasyFinance logo" priority />
      </Link>
      <div className="w-full px-2">
        <div
          className={`flex flex-col items-center w-full mt-3 border-t border-${
            theme === 'dark' ? 'gray-700' : 'gray-300'
          }`}
        >
          <Navigator
            pathNames={Routes}
            linkCssClasses={menuStyles.menu_link}
            titleCssClasses={menuStyles.menu_title}
          />
        </div>
      </div>
      <Navigator
        pathNames={ProfileRoute}
        linkCssClasses={menuStyles.profile_link}
        titleCssClasses={menuStyles.menu_title}
      />
    </div>
  );
}
export default React.memo(Menu);

/* eslint-disable react/no-unknown-property */
import Image from 'next/image';
import Link from 'next/link';
import { HiChartPie } from 'react-icons/hi';
import { IoPersonCircleOutline, IoWallet } from 'react-icons/io5';
import logo from '../../public/easyFinance-logo.svg';
import { ICON_SIZE } from '../../utils';
import Navigator from '../Navigator/Navigator';
import menuStyles from './menu.module.scss';

function Menu() {
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
    <div className="flex flex-col items-center w-70 overflow-hidden text-gray-400 bg-gray-900 rounded-r overflow-y-auto h-screen">
      <Link className="flex items-center w-full px-3 mt-3" href="/">
        <Image src={logo} alt="EasyFinance logo" />
      </Link>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
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
export default Menu;

'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Avatar, Button, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import dropdownStyles from './dropdown.module.css';
import { IUser } from '../../utils';
import { getInitials, getTextColor, stringToMulticolor } from '../../utils/hooks/custom.hooks';

const { Text } = Typography;

const items: MenuProps['items'] = [
  {
    label: 'Logout',
    key: '0',
    danger: true,
    onClick: () => signOut(),
  },
];

function DropdownUser({ user }: IUser) {
  const color = stringToMulticolor(user?.name!);
  const textColor = getTextColor(color);
  const avatarStyles = !user?.image
    ? {
        backgroundColor: color,
        color: textColor,
      }
    : {};
  return (
    <Dropdown menu={{ items }}>
      <Button onClick={(e) => e.preventDefault()} className={dropdownStyles.user_btn}>
        <Avatar
          style={avatarStyles}
          src={
            <Image
              className={dropdownStyles.userImg}
              src={user?.image!}
              width={40}
              height={40}
              alt="User image"
              priority
            />
          }
        >
          {!user?.image && getInitials(user?.name!)}
        </Avatar>
        <Text>Hola {user?.name}</Text>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
export default DropdownUser;

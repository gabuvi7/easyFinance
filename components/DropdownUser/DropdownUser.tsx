'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Button, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import dropdownStyles from './dropdown.module.css';
import { IUser } from '../../utils';

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
  return (
    <Dropdown menu={{ items }}>
      <Button onClick={(e) => e.preventDefault()} className={dropdownStyles.user_btn}>
        <Image
          className={dropdownStyles.userImg}
          src={user?.image!}
          width={40}
          height={40}
          alt="User image"
          priority
        />
        <Text>Hola {user?.name}</Text>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
export default DropdownUser;

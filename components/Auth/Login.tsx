'use client';

import { Button, Card, Space } from 'antd';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import logo from '../../public/wallet-logo.svg';
import loginStyles from './login.module.css';

function LoginStyled() {
  return (
    <Card size="small" className={loginStyles.loginContainer}>
      <Space className={loginStyles.loginLogoSpace}>
        <Image src={logo} width={300} height={300} alt="logo" />
      </Space>
      <Space className={loginStyles.loginButtonSpace}>
        <Button type="primary" onClick={() => signIn('google')}>
          Sign In to use EasyFinance
        </Button>
      </Space>
    </Card>
  );
}
export default LoginStyled;

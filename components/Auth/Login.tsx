'use client';

import { Button, Card, Divider, Space, theme as antTheme } from 'antd';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ThemeContext } from '../../context';
import logo from '../../public/wallet-logo.svg';
import loginStyles from './login.module.css';

function LoginStyled() {
  const {
    token: { colorInfoBorder, colorBgElevated },
  } = antTheme.useToken();
  const { theme } = useContext(ThemeContext);

  return (
    <Card
      className={loginStyles.loginCard}
      size="small"
      style={{ border: colorInfoBorder, background: colorBgElevated }}
    >
      <Space className={loginStyles.loginSpace}>
        <Image src={logo} width={300} height={300} alt="logo" priority />
      </Space>
      <Divider className={`loginDivider_${theme}`} type="horizontal">
        OR
      </Divider>
      <Space className={`${loginStyles.loginSpaceGoogleBtn} ${loginStyles.loginSpace}`}>
        <Button
          className={loginStyles.googleBtn}
          onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })}
        >
          <FcGoogle size="2rem" />
          Continue with Google
        </Button>
      </Space>
    </Card>
  );
}
export default LoginStyled;

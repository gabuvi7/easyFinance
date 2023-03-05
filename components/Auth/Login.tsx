'use client';

import { theme as antTheme } from 'antd';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import logo from '../../public/wallet-logo.svg';
import { GoogleButton, LoginCard, LoginDivider, LoginSpace } from './LoginStyledComponents';

function LoginStyled() {
  const {
    token: { colorInfoBorder, colorBgElevated },
  } = antTheme.useToken();
  return (
    <LoginCard size="small" border={colorInfoBorder} bg_color={colorBgElevated}>
      <LoginSpace>
        <Image src={logo} width={300} height={300} alt="logo" priority />
      </LoginSpace>
      <LoginDivider border={colorInfoBorder} type="horizontal">
        OR
      </LoginDivider>
      <LoginSpace $google_btn>
        <GoogleButton onClick={() => signIn('google')}>
          <FcGoogle size="2rem" />
          Continue with Google
        </GoogleButton>
      </LoginSpace>
    </LoginCard>
  );
}
export default LoginStyled;

'use client';

import { ConfigProvider } from 'antd';
import { useContext } from 'react';
import { ChildrenProps } from '../utils';
import {
  backgroundColours,
  borderColours,
  colours,
  fillColours,
  textColours,
} from './palette.config';
import { ThemeContext } from './ThemeContext';

function AntdProvider({ children }: ChildrenProps) {
  const { theme } = useContext(ThemeContext);
  const coloursTheme = colours[theme];
  const textColoursTheme = textColours[theme];
  const borderColoursTheme = borderColours[theme];
  const fillColoursTheme = fillColours[theme];
  const backgroundColoursTheme = backgroundColours[theme];

  return (
    <ConfigProvider
      theme={{
        token: {
          ...coloursTheme,
          ...textColoursTheme,
          ...borderColoursTheme,
          ...fillColoursTheme,
          ...backgroundColoursTheme,
        },
        components: {
          Menu: {
            colorBgContainer: backgroundColoursTheme.colorBgContainer,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;

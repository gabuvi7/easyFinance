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
} from '../theme/palette.config';
import { ThemeContext } from './ThemeContext';
import { menuCustomTheme } from '../theme/components.config';

function AntdProvider({ children }: ChildrenProps) {
  const { theme } = useContext(ThemeContext);
  const coloursTheme = colours[theme];
  const textColoursTheme = textColours[theme];
  const borderColoursTheme = borderColours[theme];
  const fillColoursTheme = fillColours[theme];
  const backgroundColoursTheme = backgroundColours[theme];
  const menuTheme = menuCustomTheme[theme];
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
            ...coloursTheme,
            ...textColoursTheme,
            ...borderColoursTheme,
            ...fillColoursTheme,
            ...backgroundColoursTheme,
            ...menuTheme,
          },
          Layout: {
            ...coloursTheme,
            ...textColoursTheme,
            ...borderColoursTheme,
            ...fillColoursTheme,
            ...backgroundColoursTheme,
            ...menuTheme,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;

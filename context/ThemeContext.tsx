'use client';

/* eslint-disable react/jsx-no-constructed-context-values */

import { createContext, useState } from 'react';
import type { MenuTheme } from 'antd';
import { ChildrenProps } from '../utils';

interface IThemeContext {
  theme: MenuTheme;
  dispatch?: (mode: MenuTheme) => void;
}

const defaultTheme: IThemeContext = {
  theme: 'light',
};

export const ThemeContext = createContext<IThemeContext>(defaultTheme);

export function ThemeProvider({ children }: ChildrenProps) {
  const [theme, setTheme] = useState<MenuTheme>('light');
  const dispatch = (mode: MenuTheme) => {
    setTheme(mode);
  };
  return <ThemeContext.Provider value={{ theme, dispatch }}>{children}</ThemeContext.Provider>;
}

'use client';

/* eslint-disable react/jsx-no-constructed-context-values */

import { createContext, useState } from 'react';
import { ChildrenProps } from '../utils';

interface IThemeContext {
  theme: string;
  dispatch?: (mode: string) => void;
}

const defaultTheme: IThemeContext = {
  theme: 'dark',
};

export const ThemeContext = createContext<IThemeContext>(defaultTheme);

export function ThemeProvider({ children }: ChildrenProps) {
  const [theme, setTheme] = useState('dark');
  const dispatch = (mode: string) => {
    setTheme(mode);
  };
  return <ThemeContext.Provider value={{ theme, dispatch }}>{children}</ThemeContext.Provider>;
}

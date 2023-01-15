'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChildrenProps } from '../utils/interfaces/childrenPropsInterface';

const mdTheme = createTheme();

function CustomThemeProvider({ children }: ChildrenProps) {
  return <ThemeProvider theme={mdTheme}>{children}</ThemeProvider>;
}
export default CustomThemeProvider;

import { ChildrenProps } from '../utils/interfaces/childrenPropsInterface';
import CustomThemeProvider from './themeProvider';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}

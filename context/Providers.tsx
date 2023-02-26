import { ChildrenProps } from '../utils';
import AntdProvider from './AntdProvider';
import { AuthContextProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';

function Providers({ children }: ChildrenProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <AntdProvider>{children}</AntdProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
export default Providers;

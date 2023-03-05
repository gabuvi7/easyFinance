import { ChildrenProps } from '../utils';
import AntdProvider from './AntdProvider';
import SessionProvider from './SessionProvider';
import { ThemeProvider } from './ThemeContext';

function Providers({ children, session }: ChildrenProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <AntdProvider>{children}</AntdProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
export default Providers;

import { SessionProps } from '../utils';
import AntdProvider from './AntdProvider';
import SessionProvider from './SessionProvider';
import { ThemeProvider } from './ThemeContext';

function Providers({ children, session }: SessionProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <AntdProvider>{children}</AntdProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
export default Providers;

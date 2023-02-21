import { ChildrenProps } from '../utils';
import AntdProvider from './AntdProvider';
import { ThemeProvider } from './ThemeContext';

function Providers({ children }: ChildrenProps) {
  return (
    <>
      <ThemeProvider>
        <AntdProvider>{children}</AntdProvider>
      </ThemeProvider>
    </>
  );
}
export default Providers;

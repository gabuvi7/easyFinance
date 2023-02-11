import { ChildrenProps } from '../utils';
import AntdProvider from './AntdProvider';
import { ThemeProvider } from './ThemeContext';

function Providers({ children }: ChildrenProps) {
  return (
    <>
      <AntdProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AntdProvider>
    </>
  );
}
export default Providers;

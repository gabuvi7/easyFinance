import { ChildrenProps } from '../utils';
import { ThemeProvider } from './ThemeContext';

function Providers({ children }: ChildrenProps) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
export default Providers;

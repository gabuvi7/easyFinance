import Menu from '../components/Menu/Menu';
import { ChildrenProps } from '../utils/interfaces/children.interface';
import StyledComponentsRegistry from './lib/registry';
import './tailwind-global.scss';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <StyledComponentsRegistry>
          <div className="flex h-100">
            <Menu />
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

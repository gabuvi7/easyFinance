import { ContentAppLayout, GeneralLayout } from '../components/Layouts';

import Sidebar from '../components/Menu/Sidebar';
import { Providers } from '../context';
import { ChildrenProps } from '../utils/interfaces/children.interface';

import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.scss';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <GeneralLayout>
              <Sidebar />
              <ContentAppLayout>{children}</ContentAppLayout>
            </GeneralLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

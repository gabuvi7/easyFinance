import { Suspense } from 'react';
import { ContentAppLayout, GeneralLayout } from '../components/Layouts';

import Sidebar from '../components/Menu/Sidebar';
import { Providers } from '../context';
import { ChildrenProps } from '../utils/interfaces/children.interface';

import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.scss';
import Loading from './loading';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <Suspense fallback={<Loading />}>
          <StyledComponentsRegistry>
            <Providers>
              <GeneralLayout>
                <Sidebar />
                <ContentAppLayout>{children}</ContentAppLayout>
              </GeneralLayout>
            </Providers>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  );
}

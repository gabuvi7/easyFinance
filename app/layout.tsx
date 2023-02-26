import { Metadata } from 'next';

import { Providers } from '../context';
import { ChildrenProps } from '../utils/interfaces/children.interface';

import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.scss';
import { ContentAppLayout, GeneralLayout, Sidebar } from '../components';

export const metadata: Metadata = {
  title: 'EasyFinance',
  description: 'EasyFinance allows you a good perspective about your billings and personal finance',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  icons: '/eF-wallet-head-logo.png',
};

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

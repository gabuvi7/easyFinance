import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { Providers } from '../context';
import { ChildrenProps } from '../utils/interfaces/children.interface';

import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.scss';
import { ContentAppLayout, GeneralLayout, Sidebar } from '../components';

import { authOptions } from '../utils/const/auth.providers';

export const metadata: Metadata = {
  title: 'EasyFinance',
  description: 'EasyFinance allows you a good perspective about your billings and personal finance',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  icons: '/eF-wallet-head-logo.png',
};

export default async function RootLayout({ children }: ChildrenProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body>
        <StyledComponentsRegistry>
          <Providers session={session}>
            <GeneralLayout>
              {!session ? (
                <ContentAppLayout>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>{children}</div>
                </ContentAppLayout>
              ) : (
                <>
                  <Sidebar />
                  <ContentAppLayout>{children}</ContentAppLayout>
                </>
              )}
            </GeneralLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

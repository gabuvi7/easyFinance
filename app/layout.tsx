import { Metadata } from 'next';
import { Providers } from '../context';
import { ChildrenProps } from '../utils/interfaces/children.interface';

import '../styles/globals.scss';
import { ContentAppLayout, GeneralLayout, Sidebar } from '../components';
import { getCurrentUser } from '../lib/session';

export const metadata: Metadata = {
  title: 'EasyFinance',
  description: 'EasyFinance allows you a good perspective about your billings and personal finance',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  icons: '/eF-wallet-head-logo.png',
};

export default async function RootLayout({ children }: ChildrenProps) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <GeneralLayout>
            {!user ? (
              <ContentAppLayout user={user}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>{children}</div>
              </ContentAppLayout>
            ) : (
              <>
                <Sidebar />
                <ContentAppLayout user={user}>{children}</ContentAppLayout>
              </>
            )}
          </GeneralLayout>
        </Providers>
      </body>
    </html>
  );
}

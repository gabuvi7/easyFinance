'use client';

import { SessionProvider as Provider } from 'next-auth/react';
import { ClientOnly } from '../components';
import { SessionProps } from '../utils';

function SessionProvider({ children, session }: SessionProps) {
  return (
    <ClientOnly>
      <Provider session={session}>{children}</Provider>
    </ClientOnly>
  );
}
export default SessionProvider;

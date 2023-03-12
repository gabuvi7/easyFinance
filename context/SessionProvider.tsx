'use client';

import { SessionProvider as Provider } from 'next-auth/react';

function SessionProvider({ children, session }: any) {
  return <Provider session={session}>{children}</Provider>;
}
export default SessionProvider;

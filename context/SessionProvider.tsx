'use client';

import { SessionProvider as Provider } from 'next-auth/react';
import { SessionProps } from '../utils';

function SessionProvider({ children, session }: SessionProps) {
  return <Provider session={session}>{children}</Provider>;
}
export default SessionProvider;

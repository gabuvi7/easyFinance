/* eslint-disable no-sparse-arrays */

'use client';

import { SessionProvider as Provider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { StyledLoading } from '../components';
import { ChildrenProps } from '../utils';

function SessionProvider({ children, session }: ChildrenProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<any>({} as any);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = () => {
      if (session) {
        setUser(session);
      } else {
        setUser({} as any);
      }
      setLoading(false);
    };

    return () => unsubscribe();
  }, [, session]);

  return (
    <Provider session={session}>
      {loading ? (
        <div style={{ alignItems: 'center', display: 'flex', height: '100vh' }}>
          <StyledLoading />
        </div>
      ) : (
        children
      )}
    </Provider>
  );
}
export default SessionProvider;

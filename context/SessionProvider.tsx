/* eslint-disable no-sparse-arrays */

'use client';

import { SessionProvider as Provider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { StyledLoading } from '../components';
import { ChildrenProps } from '../utils';

function SessionProvider({ children, session }: ChildrenProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return () => setLoading(false);
  }, []);

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

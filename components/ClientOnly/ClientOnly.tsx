'use client';

import { ChildrenProps } from '@/utils';
import { useState, useEffect } from 'react';
import { StyledLoading } from '..';

function ClientOnly({ children, ...delegated }: ChildrenProps) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return (
      <div style={{ alignItems: 'center', display: 'flex', height: '100vh' }}>
        <StyledLoading />
      </div>
    );
  }
  return <div {...delegated}>{children}</div>;
}

export default ClientOnly;

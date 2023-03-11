'use client';

import { useState, useEffect } from 'react';
import { ChildrenProps } from '../../utils';

function ClientOnly({ children, ...delegated }: ChildrenProps) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
}

export default ClientOnly;

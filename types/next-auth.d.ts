// types/next-auth.d.ts

import 'next-auth/jwt';
import 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    isNewUser?: boolean;
  }
}

declare module 'next-auth' {
  interface User {
    isNewUser?: boolean;
    given_name?: string;
    family_name?: string;
  }
}

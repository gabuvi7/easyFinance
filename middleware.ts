import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);

    const token = await getToken({ req });
    const isAuth = !!token;
    const url = req.nextUrl.clone();
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return null;
    }

    if (!isAuth) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/', '/dashboard', '/account', '/billings', '/login', '/register'],
};

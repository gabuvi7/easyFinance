import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('easy-finance', 'Gabuvi7');

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const user = {
      name: 'Gabriel Uviedo',
      authenticated: false,
    };
    if (user.authenticated === true) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

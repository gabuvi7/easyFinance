import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });
  const url = req.nextUrl.clone();
  const requestedPage = req.nextUrl.pathname;

  if (!session) {
    url.pathname = '/login';
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: ['/', '/dashboard', '/account', '/billings'],
};

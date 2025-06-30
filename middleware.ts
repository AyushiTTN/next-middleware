import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isLoggedIn = !!token;

  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === '/login';
  const isProtectedRoute = ['/dashboard', '/profile'].includes(pathname);

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoggedIn && isLoginRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard', '/profile'],
};

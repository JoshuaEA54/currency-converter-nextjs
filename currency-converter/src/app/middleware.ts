import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const apiKey = process.env.CURRENCY_API_KEY;

  if (!apiKey) {
    return NextResponse.redirect('/error?message=API%20key%20is%20missing');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};

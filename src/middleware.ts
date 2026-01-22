import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  // Get just the pathname (no hostname, port, or schema)
  const path = request.nextUrl.pathname

  if (path === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

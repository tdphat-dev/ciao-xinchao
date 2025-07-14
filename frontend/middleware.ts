import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const user = session?.user

    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!user || user.user_metadata?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  } catch (err) {
    console.error('Middleware error:', err)
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}

import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;
    const role = user?.user_metadata?.role;

    console.log('🔐 Middleware triggered');
    console.log('🌐 Pathname:', req.nextUrl.pathname);
    console.log('👤 User ID:', user?.id || 'No user');
    console.log('🛡️ Role from metadata:', role);

    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!user) {
        console.log('❌ No user, redirecting to /');
        return NextResponse.redirect(new URL('/', req.url));
      }

      if (role !== 'admin') {
        console.log('❌ User is not admin, redirecting to /');
        return NextResponse.redirect(new URL('/', req.url));
      }

      console.log('✅ Admin access granted');
    }
  } catch (err) {
    console.error('❌ Middleware error:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};

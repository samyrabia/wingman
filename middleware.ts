import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { UserRole } from './src/types/database';

// List of admin-only routes
const ADMIN_ROUTES = [
  '/admin/dashboard',
  '/admin/users',
  '/admin/items',
  '/admin/orders',
  '/admin/settings',
  '/admin/supabase-test',
];

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  
  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );
  
  const pathname = req.nextUrl.pathname;

  // Special case for admin login page - always accessible
  if (pathname === '/admin/login') {
    return res;
  }

  // Check if the route is an admin route
  const isAdminRoute = ADMIN_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // If not an admin route, proceed normally
  if (!isAdminRoute) {
    return res;
  }

  // For admin routes, check authentication and admin role
  try {
    // Get the user's session
    const { data: { session } } = await supabase.auth.getSession();
    
    // If no session and trying to access admin route, redirect to admin login
    if (!session) {
      const redirectUrl = new URL('/admin/login', req.url);
      redirectUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if the user has admin role
    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error || !userData || userData.role !== UserRole.ADMIN) {
      // Not an admin, redirect to home page
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    // User is an admin, allow access
    return res;
  } catch (error) {
    console.error('Error in middleware:', error);
    // On error, redirect to home page
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Match all admin routes
    '/admin/:path*',
    // Match API routes that need auth
    '/api/admin/:path*',
  ],
};

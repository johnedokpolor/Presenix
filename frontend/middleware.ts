import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If user is not authenticated and tries to access /dashboard, redirect to /signin
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If user is authenticated and tries to access /signin, redirect to /dashboard
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Otherwise, continue
  return NextResponse.next();
}

// Match both /dashboard/* and /signin for middleware to run
export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};

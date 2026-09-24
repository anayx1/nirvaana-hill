import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const sessionCookie = request.cookies.get("nirvaana_admin_session");
    const hasSession = Boolean(sessionCookie && sessionCookie.value);

    // If user is already logged in and tries to access /admin/login, redirect to /admin
    if (isLoginPage && hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // If user is not logged in and tries to access any /admin page (except /admin/login), redirect to /admin/login
    if (!isLoginPage && !hasSession) {
      const loginUrl = new URL("/admin/login", request.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("redirect", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

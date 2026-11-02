// Runs before every matching request (A10).
// 1. /admin and /api/admin: only role ADMIN gets through, checked on the server.
// 2. CSRF: state-changing API requests must come from our own origin.
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");

  // CSRF origin check. Auth.js protects its own routes with a CSRF token;
  // the Stripe webhook is verified by its signature instead (week 9).
  if (
    isApi &&
    WRITE_METHODS.has(req.method) &&
    !pathname.startsWith("/api/auth/callback") &&
    !pathname.startsWith("/api/auth/signout") &&
    !pathname.startsWith("/api/auth/signin") &&
    !pathname.startsWith("/api/webhooks/")
  ) {
    const origin = req.headers.get("origin");
    if (origin && new URL(origin).host !== req.headers.get("host")) {
      return NextResponse.json({ error: "Cross-site request blocked" }, { status: 403 });
    }
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      if (isApi) return NextResponse.json({ error: "Login required" }, { status: 401 });
      const login = new URL("/login", req.url);
      login.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(login);
    }
    if (token.role !== "ADMIN") {
      if (isApi) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      return NextResponse.rewrite(new URL("/forbidden", req.url), { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

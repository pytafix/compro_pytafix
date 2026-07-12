import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// ─── Rate Limiter (Edge Runtime) ───────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX_REQUESTS = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

// ─── Auth Guard ───────────────────────────────────────────────────────────────

async function verifyAdminAuth(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin") && path !== "/admin/login";
  const isAdminApiRoute = path.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApiRoute) {
    return null; // Not an admin route, let rate limiter handle it
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    await jwtVerify(token, secret);
    return null; // Auth passed
  } catch {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("admin_token");
    return response;
  }
}

// ─── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Rate limit public API endpoints
  const publicApiPaths = ["/api/booking", "/api/status", "/api/warranty"];
  if (publicApiPaths.some((p) => path.startsWith(p))) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait and try again." },
        { status: 429 }
      );
    }
  }

  // Admin auth for admin routes
  const authResult = await verifyAdminAuth(request);
  if (authResult !== null) {
    return authResult;
  }

  return NextResponse.next();
}

// Run middleware on admin routes + public API routes
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/booking", "/api/status", "/api/warranty"],
};

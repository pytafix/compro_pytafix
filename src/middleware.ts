import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect all routes under /admin and /api/admin
  const isAdminRoute = path.startsWith("/admin") && path !== "/admin/login";
  const isAdminApiRoute = path.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
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
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("admin_token");
    return response;
  }
}

// Ensure the middleware runs only on specified paths
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

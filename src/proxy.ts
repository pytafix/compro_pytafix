import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

async function verifyAdminAuth(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminPage = path.startsWith("/admin") && path !== "/admin/login";
  const isAdminApi = path.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) return null;

  const token = request.cookies.get("admin_token")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret || secret.length < 32) {
    return isAdminApi
      ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
      issuer: "pytafix-admin",
      audience: "pytafix-admin",
    });
    if (payload.role !== "admin") throw new Error("Invalid admin role");
    return null;
  } catch {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("admin_token");
    return response;
  }
}

export async function proxy(request: NextRequest) {
  const authResult = await verifyAdminAuth(request);
  const path = request.nextUrl.pathname;
  const isApiRequest = path.startsWith("/api/");

  if (isApiRequest) {
    const contentLength = Number(request.headers.get("content-length") || 0);
    const isUploadPost = request.method === "POST" && path === "/api/admin/upload";
    const maxBytes = isUploadPost ? 6 * 1024 * 1024 : 512 * 1024;
    if (contentLength > maxBytes) {
      const response = NextResponse.json(
        { error: "Permintaan terlalu besar." },
        { status: 413, headers: { "Cache-Control": "no-store" } }
      );
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }
  }

  const response = authResult ?? NextResponse.next();

  if (isApiRequest) {
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  } else if (path.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { loginSchema } from '@/lib/validations';
import { createHash } from "crypto";
import { loginRateLimit } from "@/lib/rate-limit";
import { hasTrustedMutationOrigin } from "@/lib/request-origin";

function timingSafeEqual(a: string, b: string): boolean {
  const aHash = createHash("sha256").update(a).digest();
  const bHash = createHash("sha256").update(b).digest();
  if (aHash.length !== bHash.length) return false;
  let result = 0;
  for (let i = 0; i < aHash.length; i++) {
    result |= aHash[i] ^ bHash[i];
  }
  return result === 0;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_384) {
    return NextResponse.json({ error: "Permintaan terlalu besar." }, { status: 413, headers: { "Cache-Control": "no-store" } });
  }
  if (!hasTrustedMutationOrigin(request)) {
    return NextResponse.json({ error: "Permintaan tidak berasal dari situs yang dipercaya." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const rateLimitResponse = await loginRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid login payload" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const { password } = result.data;

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || adminPassword.length < 12) {
      console.error("ADMIN_PASSWORD is not set in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500, headers: { "Cache-Control": "no-store" } });
    }

    if (!timingSafeEqual(password, adminPassword)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401, headers: { "Cache-Control": "no-store" } });
    }

    // Password is correct, create JWT token
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
      console.error("JWT_SECRET is not set in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500, headers: { "Cache-Control": "no-store" } });
    }

    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("pytafix-admin")
      .setAudience("pytafix-admin")
      .setExpirationTime("24h") // Token expires in 24 hours
      .sign(new TextEncoder().encode(secret));

    // Create response and set HTTP-only cookie
    const response = NextResponse.json({ success: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
    
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

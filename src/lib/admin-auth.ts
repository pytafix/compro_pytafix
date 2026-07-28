import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { hasTrustedMutationOrigin } from "@/lib/request-origin";

const JWT_ISSUER = "pytafix-admin";
const JWT_AUDIENCE = "pytafix-admin";

export async function requireAdmin(request?: Request): Promise<NextResponse | null> {
  const token = (await cookies()).get("admin_token")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret || secret.length < 32) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (request && !["GET", "HEAD", "OPTIONS"].includes(request.method)) {
      if (!hasTrustedMutationOrigin(request)) {
        return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
      }
    }

    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

import { NextResponse } from "next/server";
import { hasTrustedMutationOrigin } from "@/lib/request-origin";

export async function POST(request: Request) {
  if (!hasTrustedMutationOrigin(request)) {
    return NextResponse.json({ error: "Permintaan tidak berasal dari situs yang dipercaya." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  
  // Clear the cookie by setting it to empty with maxAge 0
  response.cookies.set({
    name: "admin_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return response;
}

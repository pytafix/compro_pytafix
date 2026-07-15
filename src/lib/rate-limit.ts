import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

function createRateLimiter(config: RateLimitConfig) {
  return async function rateLimit(request: Request): Promise<NextResponse | null> {
    const headers = new Headers(request.headers);
    const ip =
      headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      headers.get("x-real-ip") ||
      "unknown";

    const url = new URL(request.url);
    const key = `${ip}:${url.pathname}`;
    const now = Date.now();
    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(key, { count: 1, resetTime: now + config.windowMs });
      return null;
    }

    if (record.count >= config.maxRequests) {
      return NextResponse.json(
        { error: "Too many requests. Please wait and try again." },
        { status: 429, headers: { "Retry-After": Math.ceil((record.resetTime - now) / 1000).toString() } }
      );
    }

    record.count++;
    return null;
  };
}

export const loginRateLimit = createRateLimiter({ windowMs: 15 * 60 * 1000, maxRequests: 5 });
export const apiRateLimit = createRateLimiter({ windowMs: 60 * 1000, maxRequests: 30 });
export const bookingRateLimit = createRateLimiter({ windowMs: 60 * 1000, maxRequests: 10 });
export const contactRateLimit = createRateLimiter({ windowMs: 60 * 1000, maxRequests: 10 });
export const statusRateLimit = createRateLimiter({ windowMs: 60 * 1000, maxRequests: 30 });
export const warrantyRateLimit = createRateLimiter({ windowMs: 60 * 1000, maxRequests: 10 });
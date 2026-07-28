import { NextResponse } from "next/server";
import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_LOCAL_KEYS = 5_000;
const hasDistributedConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
);
const allowLocalFallback =
  process.env.NODE_ENV !== "production" ||
  process.env.RATE_LIMIT_ALLOW_LOCAL_FALLBACK === "true";
const redis = hasDistributedConfig ? Redis.fromEnv() : null;

interface RateLimitConfig {
  name: string;
  window: Duration;
  windowMs: number;
  maxRequests: number;
}

function createRateLimiter(config: RateLimitConfig) {
  const distributedLimiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(config.maxRequests, config.window),
        analytics: false,
        prefix: `pytafix:ratelimit:${config.name}`,
        timeout: 1_500,
      })
    : null;

  return async function rateLimit(request: Request): Promise<NextResponse | null> {
    const ip =
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const url = new URL(request.url);
    const key = `${ip}:${url.pathname}`;
    const now = Date.now();

    if (distributedLimiter) {
      try {
        const result = await distributedLimiter.limit(key);
        if (result.reason === "timeout") {
          return rateLimitUnavailable();
        }
        if (!result.success) {
          return rateLimitExceeded(result.reset - now, {
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset,
          });
        }
        return null;
      } catch (error) {
        console.error(`Distributed rate limit failed for ${config.name}:`, error);
        if (!allowLocalFallback) return rateLimitUnavailable();
      }
    } else if (!allowLocalFallback) {
      return rateLimitUnavailable();
    }

    if (rateLimitMap.size >= MAX_LOCAL_KEYS) {
      for (const [storedKey, storedRecord] of rateLimitMap) {
        if (storedRecord.resetTime <= now) rateLimitMap.delete(storedKey);
      }
      if (rateLimitMap.size >= MAX_LOCAL_KEYS) {
        const oldestKey = rateLimitMap.keys().next().value;
        if (oldestKey) rateLimitMap.delete(oldestKey);
      }
    }

    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(key, { count: 1, resetTime: now + config.windowMs });
      return null;
    }

    if (record.count >= config.maxRequests) {
      return rateLimitExceeded(record.resetTime - now);
    }

    record.count++;
    return null;
  };
}

function rateLimitExceeded(
  resetInMs: number,
  distributed?: { limit: number; remaining: number; reset: number }
) {
  return NextResponse.json(
    { error: "Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi." },
    {
      status: 429,
      headers: {
        "Retry-After": Math.max(1, Math.ceil(resetInMs / 1000)).toString(),
        "Cache-Control": "no-store",
        ...(distributed
          ? {
              "X-RateLimit-Limit": distributed.limit.toString(),
              "X-RateLimit-Remaining": distributed.remaining.toString(),
              "X-RateLimit-Reset": distributed.reset.toString(),
            }
          : {}),
      },
    }
  );
}

function rateLimitUnavailable() {
  return NextResponse.json(
    { error: "Perlindungan permintaan sementara tidak tersedia. Coba lagi nanti." },
    {
      status: 503,
      headers: {
        "Retry-After": "60",
        "Cache-Control": "no-store",
      },
    }
  );
}

export const loginRateLimit = createRateLimiter({
  name: "login",
  window: "15 m",
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
});
export const apiRateLimit = createRateLimiter({
  name: "api",
  window: "1 m",
  windowMs: 60 * 1000,
  maxRequests: 30,
});
export const bookingRateLimit = createRateLimiter({
  name: "booking",
  window: "1 m",
  windowMs: 60 * 1000,
  maxRequests: 10,
});
export const contactRateLimit = createRateLimiter({
  name: "contact",
  window: "1 m",
  windowMs: 60 * 1000,
  maxRequests: 10,
});
export const statusRateLimit = createRateLimiter({
  name: "status",
  window: "1 m",
  windowMs: 60 * 1000,
  maxRequests: 30,
});
export const warrantyRateLimit = createRateLimiter({
  name: "warranty",
  window: "1 m",
  windowMs: 60 * 1000,
  maxRequests: 10,
});

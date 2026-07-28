import { describe, expect, it } from "vitest";
import { loginRateLimit } from "./rate-limit";

describe("local rate limiter", () => {
  it("allows the configured requests and then returns a bounded 429 response", async () => {
    const request = new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: {
        "x-real-ip": `test-${crypto.randomUUID()}`,
      },
    });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(await loginRateLimit(request)).toBeNull();
    }

    const blocked = await loginRateLimit(request);
    expect(blocked?.status).toBe(429);
    expect(blocked?.headers.get("retry-after")).toBeTruthy();
    expect(blocked?.headers.get("cache-control")).toBe("no-store");
  });
});

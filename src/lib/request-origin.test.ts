import { describe, expect, it } from "vitest";
import { hasTrustedMutationOrigin } from "./request-origin";

function makeRequest({
  url = "http://localhost:3100/api/admin/test",
  origin,
  host = "127.0.0.1:3100",
  forwardedHost,
  forwardedProto = "http",
  fetchSite = "same-origin",
}: {
  url?: string;
  origin?: string;
  host?: string;
  forwardedHost?: string;
  forwardedProto?: string;
  fetchSite?: string;
}) {
  const headers = new Headers({
    host,
    "x-forwarded-proto": forwardedProto,
    "sec-fetch-site": fetchSite,
  });
  if (origin) headers.set("origin", origin);
  if (forwardedHost) headers.set("x-forwarded-host", forwardedHost);
  return new Request(url, { method: "PATCH", headers });
}

describe("hasTrustedMutationOrigin", () => {
  it("accepts the browser host when the internal request URL uses localhost", () => {
    expect(
      hasTrustedMutationOrigin(
        makeRequest({ origin: "http://127.0.0.1:3100" })
      )
    ).toBe(true);
  });

  it("accepts a trusted forwarded host and protocol", () => {
    expect(
      hasTrustedMutationOrigin(
        makeRequest({
          url: "http://localhost:3000/api/admin/test",
          origin: "https://preview.example.com",
          host: "localhost:3000",
          forwardedHost: "preview.example.com",
          forwardedProto: "https",
        })
      )
    ).toBe(true);
  });

  it("rejects missing, cross-site, mismatched-host, and mismatched-protocol origins", () => {
    expect(hasTrustedMutationOrigin(makeRequest({}))).toBe(false);
    expect(
      hasTrustedMutationOrigin(
        makeRequest({
          origin: "http://127.0.0.1:3100",
          fetchSite: "cross-site",
        })
      )
    ).toBe(false);
    expect(
      hasTrustedMutationOrigin(
        makeRequest({ origin: "http://attacker.example" })
      )
    ).toBe(false);
    expect(
      hasTrustedMutationOrigin(
        makeRequest({
          origin: "https://127.0.0.1:3100",
          forwardedProto: "http",
        })
      )
    ).toBe(false);
  });
});

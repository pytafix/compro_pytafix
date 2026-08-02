import { describe, expect, it } from "vitest";
import { CONTACT } from "./config";

describe("public contact copy", () => {
  it("keeps visit guidance customer-facing", () => {
    expect(CONTACT.visitNote).toMatch(/WhatsApp/i);
    expect(CONTACT.visitNote).not.toMatch(/listing|preview|pin|internal|audit/i);
  });

  it("publishes only the owner-confirmed local business coordinates", () => {
    expect(CONTACT.locationVerified).toBe(true);
    expect(CONTACT.geo).toEqual({ latitude: -7.9854846, longitude: 112.6422118 });
    expect(CONTACT.mapsUrl).toContain("g%2F11zd08yrsk");
  });
});

import { describe, expect, it } from "vitest";
import { CONTACT } from "./config";

describe("public contact copy", () => {
  it("keeps visit guidance customer-facing", () => {
    expect(CONTACT.visitNote).toMatch(/WhatsApp/i);
    expect(CONTACT.visitNote).not.toMatch(/listing|preview|pin|internal|audit/i);
  });
});

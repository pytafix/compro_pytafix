import { describe, expect, it } from "vitest";
import {
  canTransitionWarrantyStatus,
  getAllowedWarrantyStatuses,
} from "./warranty";

describe("canTransitionWarrantyStatus", () => {
  it("allows the supported forward workflow", () => {
    expect(canTransitionWarrantyStatus("MENUNGGU", "DIPROSES")).toBe(true);
    expect(canTransitionWarrantyStatus("MENUNGGU", "DITOLAK")).toBe(true);
    expect(canTransitionWarrantyStatus("DIPROSES", "SELESAI")).toBe(true);
    expect(canTransitionWarrantyStatus("DIPROSES", "DITOLAK")).toBe(true);
  });

  it("allows idempotent updates", () => {
    expect(canTransitionWarrantyStatus("DIPROSES", "DIPROSES")).toBe(true);
  });

  it("prevents reopening or skipping terminal workflow states", () => {
    expect(canTransitionWarrantyStatus("MENUNGGU", "SELESAI")).toBe(false);
    expect(canTransitionWarrantyStatus("SELESAI", "DIPROSES")).toBe(false);
    expect(canTransitionWarrantyStatus("DITOLAK", "MENUNGGU")).toBe(false);
  });

  it("returns only valid choices for the admin control", () => {
    expect(getAllowedWarrantyStatuses("MENUNGGU")).toEqual([
      "MENUNGGU",
      "DIPROSES",
      "DITOLAK",
    ]);
    expect(getAllowedWarrantyStatuses("SELESAI")).toEqual(["SELESAI"]);
  });
});

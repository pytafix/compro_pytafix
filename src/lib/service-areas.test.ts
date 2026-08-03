import { describe, expect, it } from "vitest";
import {
  getLegacyAreaRedirect,
  getServiceArea,
  INDEXABLE_SERVICE_AREAS,
  MALANG_RAYA_AREAS,
} from "./service-areas";

describe("Malang Raya service-area architecture", () => {
  it("keeps the official 5 + 3 + 33 administrative-area inventory", () => {
    expect(MALANG_RAYA_AREAS).toHaveLength(41);
    expect(MALANG_RAYA_AREAS.filter((serviceArea) => serviceArea.region === "Kota Malang")).toHaveLength(5);
    expect(MALANG_RAYA_AREAS.filter((serviceArea) => serviceArea.region === "Kota Batu")).toHaveLength(3);
    expect(MALANG_RAYA_AREAS.filter((serviceArea) => serviceArea.region === "Kabupaten Malang")).toHaveLength(33);
  });

  it("does not make every area indexable before local evidence exists", () => {
    expect(INDEXABLE_SERVICE_AREAS.map((serviceArea) => serviceArea.slug)).toEqual(["batu"]);
    expect(getServiceArea("batu")?.indexable).toBe(true);
    expect(getServiceArea("kepanjen")?.indexable).toBe(false);
  });

  it("routes old Batu service variants to the regional page", () => {
    expect(getLegacyAreaRedirect("service-hp-batu")).toBe("/area-layanan/batu");
    expect(getLegacyAreaRedirect("jual-laptop-batu")).toBe("/area-layanan/batu");
    expect(getLegacyAreaRedirect("service-hp-kepanjen")).toBeUndefined();
  });
});

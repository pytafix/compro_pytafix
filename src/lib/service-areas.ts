export type ServiceAreaRegion = "Kota Malang" | "Kota Batu" | "Kabupaten Malang";
export type ServiceAreaTier = "core" | "pilot" | "directory";

export type ServiceArea = {
  slug: string;
  name: string;
  region: ServiceAreaRegion;
  tier: ServiceAreaTier;
  /** Only areas with reviewed, user-facing evidence may be indexable. */
  indexable: boolean;
};

const area = (
  name: string,
  region: ServiceAreaRegion,
  tier: ServiceAreaTier = "directory",
): ServiceArea => ({
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  region,
  tier,
  indexable: tier === "pilot",
});

const KOTA_MALANG: ServiceArea[] = [
  area("Blimbing", "Kota Malang", "core"),
  area("Klojen", "Kota Malang", "core"),
  area("Kedungkandang", "Kota Malang", "core"),
  area("Lowokwaru", "Kota Malang", "core"),
  area("Sukun", "Kota Malang", "core"),
];

const KOTA_BATU: ServiceArea[] = [
  area("Batu", "Kota Batu", "pilot"),
  area("Junrejo", "Kota Batu"),
  area("Bumiaji", "Kota Batu"),
];

const KABUPATEN_MALANG_NAMES = [
  "Donomulyo",
  "Kalipare",
  "Pagak",
  "Bantur",
  "Gedangan",
  "Sumbermanjing Wetan",
  "Dampit",
  "Tirtoyudo",
  "Ampelgading",
  "Poncokusumo",
  "Wajak",
  "Turen",
  "Bululawang",
  "Gondanglegi",
  "Pagelaran",
  "Kepanjen",
  "Sumberpucung",
  "Kromengan",
  "Ngajum",
  "Wonosari",
  "Wagir",
  "Pakisaji",
  "Tajinan",
  "Tumpang",
  "Pakis",
  "Jabung",
  "Lawang",
  "Singosari",
  "Karangploso",
  "Dau",
  "Pujon",
  "Ngantang",
  "Kasembon",
] as const;

const KABUPATEN_MALANG = KABUPATEN_MALANG_NAMES.map((name) => area(name, "Kabupaten Malang"));

export const MALANG_RAYA_AREAS: ServiceArea[] = [
  ...KOTA_MALANG,
  ...KOTA_BATU,
  ...KABUPATEN_MALANG,
];

export const INDEXABLE_SERVICE_AREAS = MALANG_RAYA_AREAS.filter((serviceArea) => serviceArea.indexable);

export const SERVICE_AREA_REGIONS: ServiceAreaRegion[] = [
  "Kota Malang",
  "Kota Batu",
  "Kabupaten Malang",
];

export const CORE_SERVICE_SLUGS = [
  "service-hp",
  "service-laptop",
  "jual-sparepart",
  "jual-laptop",
] as const;

export function getServiceArea(slug: string): ServiceArea | undefined {
  return MALANG_RAYA_AREAS.find((serviceArea) => serviceArea.slug === slug);
}

/**
 * Legacy `service-*-[area]` records are not geo pages. Batu is the only
 * approved pilot, so old Batu URLs preserve intent by redirecting to it;
 * other legacy variants continue to resolve to their core service page.
 */
export function getLegacyAreaRedirect(slug: string): string | undefined {
  if (slug.endsWith("-batu")) return "/area-layanan/batu";
  return undefined;
}

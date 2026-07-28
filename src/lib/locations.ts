export const LOCATIONS = [
  "Malang",
  "Batu",
  "Kepanjen",
  "Singosari",
  "Blimbing",
  "Lowokwaru",
  "Klojen",
  "Sukun",
  "Kedungkandang",
  "Lawang",
  "Turen",
  "Dau",
  "Pakis",
  "Wagir"
];

// Normalize location to lowercase slug format
export const slugifyLocation = (loc: string) => loc.toLowerCase().replace(/\s+/g, '-');

const LOCATION_SLUGS = LOCATIONS
  .map((name) => ({ name, slug: slugifyLocation(name) }))
  .sort((a, b) => b.slug.length - a.slug.length);

export function splitLocationServiceSlug(slug: string): {
  baseSlug: string;
  location: string;
} | null {
  for (const location of LOCATION_SLUGS) {
    const suffix = `-${location.slug}`;
    if (slug.endsWith(suffix) && slug.length > suffix.length) {
      return {
        baseSlug: slug.slice(0, -suffix.length),
        location: location.name,
      };
    }
  }

  return null;
}

export function isLocationServiceSlug(slug: string): boolean {
  return splitLocationServiceSlug(slug) !== null;
}

export function getCanonicalServiceSlug(slug: string): string {
  let canonicalSlug = slug;

  while (true) {
    const variant = splitLocationServiceSlug(canonicalSlug);
    if (!variant) return canonicalSlug;
    canonicalSlug = variant.baseSlug;
  }
}

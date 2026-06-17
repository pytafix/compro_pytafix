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

export const SITE_NAME = 'Pytafix';
export const SITE_DESCRIPTION = 'Layanan pemeriksaan dan perbaikan laptop, HP, serta komputer di Malang dengan estimasi biaya sebelum pengerjaan dan pelacakan status servis.';
export const SITE_URL = 'https://www.pytafix.web.id';
export const LEGAL_ENTITY_NAME = 'CV. Pyta Cipta Karya';
type ContactGeo = { latitude: number; longitude: number } | null;

export const CONTACT = {
  whatsapp: '628814081894',
  whatsappDisplay: '+62 881-4081-894',
  email: 'info@pytafix.web.id',
  address: 'Jl. Werkudoro No. 2, RT. 2/RW. 2, Polehan, Kec. Blimbing, Kota Malang, Jawa Timur 65121',
  postalAddress: {
    streetAddress: 'Jl. Werkudoro No. 2, RT. 2/RW. 2, Polehan, Kec. Blimbing',
    addressLocality: 'Kota Malang',
    addressRegion: 'Jawa Timur',
    postalCode: '65121',
    addressCountry: 'ID',
  },
  mapsUrl: 'https://maps.app.goo.gl/29VWrXBac3oXkKHA8',
  // The supplied Google Maps short link resolves to a listing whose textual
  // NAP says Malang, but its current preview also exposes a conflicting map
  // center. Keep the listing link and user-supplied address; do not publish
  // coordinates or treat the pin as verified until the owner confirms it.
  mapEmbedUrl: 'https://www.google.com/maps?q=Pytafix%2C+Jl.+Werkudoro+No.2%2C+Polehan%2C+Kota+Malang&output=embed',
  locationVerified: false,
  visitNote: 'Sebelum berkunjung, konfirmasi jam layanan dan petunjuk lokasi melalui WhatsApp.',
  geo: null as ContactGeo,
  serviceArea: 'Malang Raya, Jawa Timur',
  hours: {
    days: 'Senin - Sabtu',
    opens: '09:00',
    closes: '18:00',
    sunday: 'Tutup',
    note: 'Konfirmasi jadwal melalui WhatsApp sebelum datang atau mengatur penjemputan.',
  },
};

export const SOCIAL = {
  instagram: 'https://www.instagram.com/pytafix',
  facebook: 'https://www.facebook.com/share/18g8dMfLV3/',
  tiktok: 'https://www.tiktok.com/@pytafix',
  youtube: 'https://www.youtube.com/@pytafix',
  threads: 'https://www.threads.net/@pytafix',
};

export const MARKETPLACES: Record<string, { src: string; label: string; bg: string }> = {
  SHOPEE: { src: '/images/marketplaces/shopee.svg', label: 'Shopee', bg: 'bg-[#EE4D2D] hover:bg-[#d43c1f]' },
  TOKOPEDIA: { src: '/images/marketplaces/tokopedia.svg', label: 'Tokopedia', bg: 'bg-[#03D30F] hover:bg-[#02b30c]' },
  BLIBLI: { src: '/images/marketplaces/blibli.svg', label: 'BLIBLI', bg: 'bg-[#1A7BB9] hover:bg-[#156695]' },
  LAZADA: { src: '/images/marketplaces/lazada.svg', label: 'Lazada', bg: 'bg-[#F05A00] hover:bg-[#d14e00]' },
};

export const SITE_NAME = 'Pytafix';
export const SITE_DESCRIPTION = 'Layanan pemeriksaan dan perbaikan laptop, HP, serta komputer di Malang dengan estimasi biaya sebelum pengerjaan dan pelacakan status servis.';
export const SITE_URL = 'https://www.pytafix.web.id';
export const LEGAL_ENTITY_NAME = 'CV. Pyta Cipta Karya';
type ContactGeo = { latitude: number; longitude: number } | null;

export const CONTACT = {
  whatsapp: '628814081894',
  whatsappDisplay: '+62 881-4081-894',
  email: 'info@pytafix.web.id',
  address: 'Jl. Werkudoro No.2, RT.2/RW.2, Polehan, Kec. Blimbing, Kota Malang, Jawa Timur 65121',
  postalAddress: {
    streetAddress: 'Jl. Werkudoro No.2, RT.2/RW.2, Polehan, Kec. Blimbing',
    addressLocality: 'Kota Malang',
    addressRegion: 'Jawa Timur',
    postalCode: '65121',
    addressCountry: 'ID',
  },
  mapsUrl: 'https://www.google.com/maps/place/Pytafix/@-7.9854793,112.6396369,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd629d3bfa0403f:0x60352246da444542!8m2!3d-7.9854846!4d112.6422118!16s%2Fg%2F11zd08yrsk',
  mapEmbedUrl: 'https://www.google.com/maps?q=-7.9854846%2C112.6422118&z=17&output=embed',
  locationVerified: true,
  visitNote: 'Jam layanan dapat berubah; konfirmasi melalui WhatsApp sebelum berkunjung.',
  geo: { latitude: -7.9854846, longitude: 112.6422118 } as ContactGeo,
  serviceArea: 'Malang Raya, Jawa Timur',
  hours: {
    days: 'Senin - Jumat',
    opens: '09:00',
    closes: '16:00',
    saturday: '09:00 - 14:00',
    sunday: '09:00 - 16:00',
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

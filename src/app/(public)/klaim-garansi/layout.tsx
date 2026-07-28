import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klaim Garansi Servis",
  description: "Ajukan pemeriksaan klaim sesuai cakupan dan durasi yang tercantum pada nota servis Pytafix.",
  alternates: { canonical: "/klaim-garansi" },
  robots: { index: false, follow: true },
  openGraph: {
  title: "Klaim Garansi Servis",
    description: "Ajukan pemeriksaan klaim sesuai ketentuan pada nota servis.",
    url: "https://www.pytafix.web.id/klaim-garansi",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Klaim Garansi" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function KlaimGaransiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

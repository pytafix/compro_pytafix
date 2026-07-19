import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klaim Garansi Servis | Pytafix",
  description: "Klaim garansi servis laptop, HP, atau komputer Anda di Pytafix. Perbaikan tanpa biaya tambahan selama masa garansi masih berlaku.",
  alternates: { canonical: "/klaim-garansi" },
  openGraph: {
  title: "Klaim Garansi Servis",
    description: "Ajukan klaim garansi servis perangkat Anda di Pytafix Malang. Gratis selama masa garansi berlaku.",
    url: "https://www.pytafix.web.id/klaim-garansi",
    images: [{ url: "/logo.png", width: 800, height: 600, alt: "Pytafix Klaim Garansi" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function KlaimGaransiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

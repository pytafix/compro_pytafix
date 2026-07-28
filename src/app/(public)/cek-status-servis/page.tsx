import { Metadata } from "next";
import CekStatusClient from "./CekStatusClient";

export const metadata: Metadata = {
    title: "Cek Status Servis",
  description: "Masukkan ID servis dan nomor WhatsApp saat booking untuk melihat status terbaru perbaikan perangkat Anda.",
  alternates: { canonical: "/cek-status-servis" },
  robots: { index: false, follow: true },
  openGraph: {
  title: "Cek Status Servis",
    description: "Lihat status terbaru perbaikan perangkat Anda di Pytafix Malang dengan ID servis dan nomor WhatsApp.",
    url: "https://www.pytafix.web.id/cek-status-servis",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Status Servis" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function CekStatusServis() {
  return <CekStatusClient />;
}

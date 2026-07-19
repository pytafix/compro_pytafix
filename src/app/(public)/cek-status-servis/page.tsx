import { Metadata } from "next";
import CekStatusClient from "./CekStatusClient";

export const metadata: Metadata = {
    title: "Cek Status Servis",
  description: "Masukkan Nomor Servis atau Resi Anda untuk melacak perkembangan perbaikan perangkat Anda secara real-time.",
  alternates: { canonical: "/cek-status-servis" },
  openGraph: {
  title: "Cek Status Servis",
    description: "Lacak status perbaikan perangkat Anda di Pytafix Malang secara real-time dengan nomor servis.",
    url: "https://www.pytafix.web.id/cek-status-servis",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Status Servis" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function CekStatusServis() {
  return <CekStatusClient />;
}

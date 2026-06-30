import { Metadata } from "next";
import CekStatusClient from "./CekStatusClient";

export const metadata: Metadata = {
  title: "Cek Status Servis | Pytafix",
  description: "Masukkan Nomor Servis atau Resi Anda untuk melacak perkembangan perbaikan perangkat Anda secara real-time.",
  alternates: { canonical: "/cek-status-servis" },
  openGraph: {
    title: "Cek Status Servis | Pytafix",
    description: "Lacak status perbaikan perangkat Anda di Pytafix Malang secara real-time dengan nomor servis.",
    url: "https://www.pytafix.web.id/cek-status-servis",
    images: [{ url: "/logo.png", width: 800, height: 600, alt: "Pytafix Status Servis" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function CekStatusServis() {
  return <CekStatusClient />;
}

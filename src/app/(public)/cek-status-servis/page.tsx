import { Metadata } from "next";
import CekStatusClient from "./CekStatusClient";

export const metadata: Metadata = {
  title: "Cek Status Servis | Pytafix",
  description: "Masukkan Nomor Servis atau Resi Anda untuk melacak perkembangan perbaikan perangkat Anda secara real-time."
};

export default function CekStatusServis() {
  return <CekStatusClient />;
}

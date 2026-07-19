import { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Booking Servis",
  description: "Jadwalkan perbaikan Anda. Isi formulir untuk memulai proses servis.",
  alternates: { canonical: "/booking-servis" },
  openGraph: {
    title: "Booking Servis Laptop, HP & Komputer",
    description: "Jadwalkan servis laptop, HP, atau komputer Anda di Pytafix Malang. Teknisi bersertifikat, pengerjaan cepat, dan garansi resmi.",
    url: "https://www.pytafix.web.id/booking-servis",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Booking Servis" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function BookingServis() {
  return <BookingClient />;
}

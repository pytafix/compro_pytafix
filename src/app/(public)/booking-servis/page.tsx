import { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Booking Servis | Pytafix",
  description: "Jadwalkan perbaikan Anda. Isi formulir untuk memulai proses servis."
};

export default function BookingServis() {
  return <BookingClient />;
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CONTACT } from '@/lib/config';

type BookingData = {
  name: string;
  whatsapp: string;
  address: string;
  deviceType: string;
  deviceBrand: string;
  serviceType: string;
  problemDesc: string;
  date: string;
};

type BookingConfirmation = {
  trackingId: string;
  data: BookingData;
};

export default function BookingClient() {
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const submittedForm = new FormData(form);
    const rawData = Object.fromEntries(submittedForm) as Record<string, string>;

    const data: BookingData = {
      name: rawData.name,
      whatsapp: rawData.whatsapp,
      address: rawData.address,
      deviceType: rawData.device_type,
      deviceBrand: rawData.device_brand,
      serviceType: rawData.service_type,
      problemDesc: rawData.problem_desc,
      date: rawData.date,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await res.json().catch(() => null);
      if (res.ok && responseData?.trackingId) {
        setConfirmation({ trackingId: responseData.trackingId, data });
        toast.success("Permintaan berhasil dikirim!");
      } else {
        toast.error(responseData?.error || "Terjadi kesalahan. Silakan periksa isian.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    document.querySelector<HTMLFormElement>("#service-form")?.reset();
  };

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  let waUrl = `https://wa.me/${CONTACT.whatsapp}?text=`;
  if (confirmation) {
    const { data, trackingId } = confirmation;
    const deviceName = data.deviceType === "smartphone" ? "Smartphone" : data.deviceType === "laptop" ? "Laptop / MacBook" : data.deviceType === "tablet" ? "Tablet / iPad" : data.deviceType === "console" ? "Konsol Game" : "Lainnya";
    const serviceName = data.serviceType === "screen" ? "Ganti Layar / LCD" : data.serviceType === "battery" ? "Ganti Baterai" : data.serviceType === "water" ? "Kerusakan Air" : data.serviceType === "software" ? "Instalasi Software / OS" : data.serviceType === "diagnostic" ? "Cek Total / Diagnostik" : "Lainnya";
    
    const text = `Halo Pytafix, saya ingin booking servis dengan detail berikut:

ID Servis: ${trackingId}

*Info Pemesan:*
- Nama: ${data.name}
- WhatsApp: ${data.whatsapp}
- Alamat: ${data.address}

*Detail Servis:*
- Jenis Perangkat: ${deviceName}
- Merk/Tipe: ${data.deviceBrand}
- Jenis Layanan: ${serviceName}
- Tanggal Booking: ${data.date}

*Deskripsi Kendala:*
${data.problemDesc}

Terima kasih.`;
    waUrl += encodeURIComponent(text);
  } else {
    waUrl += encodeURIComponent("Halo Pytafix, saya telah mengisi form booking.");
  }

  return (
    <main className="flex-grow pb-24 text-center md:text-left">
      {/* Header Section */}
      <section className="mb-24 text-center px-4 md:px-8 lg:px-margin-desktop bg-surface-container-low py-20 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-6">
            Jadwalkan Perbaikan Anda
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Isi formulir di bawah ini untuk memulai proses servis. Tim akan meninjau permintaan Anda dan menghubungi pada jam operasional untuk konfirmasi serta estimasi awal.
          </p>
        </div>
      </section>

      <div className="px-4 md:px-8 lg:px-margin-desktop max-w-container-max mx-auto w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter">
          {/* Form Area (Bento Grid Style) */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 md:p-10 shadow-sm relative overflow-hidden h-full">
            {!confirmation ? (
              <form className="space-y-6" id="service-form" onSubmit={handleSubmit}>
                {/* Personal Info Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-bold text-label-bold text-on-background block" htmlFor="name">
                      Nama Lengkap
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 outline-none transition-all"
                      id="name"
                      name="name"
                      required
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-bold text-label-bold text-on-background block" htmlFor="whatsapp">
                      Nomor WhatsApp
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 outline-none transition-all"
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="0812..."
                      required
                      type="tel"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label-bold text-label-bold text-on-background block" htmlFor="address">
                    Alamat Lengkap (Untuk Layanan Antar-Jemput)
                  </label>
                  <textarea
                    className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    id="address"
                    name="address"
                    required
                    rows={2}
                  ></textarea>
                </div>

                {/* Technical Details Group */}
                <div className="pt-6 border-t border-outline-variant grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-bold text-label-bold text-on-background block" htmlFor="device_type">
                      Jenis Perangkat
                    </label>
                    <select
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 outline-none transition-all"
                      id="device_type"
                      name="device_type"
                      required
                      defaultValue=""
                    >
                      <option disabled value="">
                        Pilih Perangkat...
                      </option>
                      <option value="smartphone">Smartphone</option>
                      <option value="laptop">Laptop / MacBook</option>
                      <option value="tablet">Tablet / iPad</option>
                      <option value="console">Konsol Game</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-bold text-label-bold text-on-background block" htmlFor="device_brand">
                      Merk / Tipe Perangkat
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 outline-none transition-all"
                      id="device_brand"
                      name="device_brand"
                      placeholder="Misal: iPhone 13, Asus ROG..."
                      required
                      type="text"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-label-bold text-label-bold text-on-background block" htmlFor="service_type">
                      Jenis Layanan
                    </label>
                    <select
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 outline-none transition-all"
                      id="service_type"
                      name="service_type"
                      required
                      defaultValue=""
                    >
                      <option disabled value="">
                        Pilih Layanan...
                      </option>
                      <option value="screen">Ganti Layar / LCD</option>
                      <option value="battery">Ganti Baterai</option>
                      <option value="water">Kerusakan Air</option>
                      <option value="software">Instalasi Software / OS</option>
                      <option value="diagnostic">Cek Total / Diagnostik</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label-bold text-label-bold text-on-background block" htmlFor="problem_desc">
                    Deskripsi Kendala
                  </label>
                  <textarea
                    className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    id="problem_desc"
                    name="problem_desc"
                    placeholder="Jelaskan secara singkat apa yang terjadi pada perangkat Anda..."
                    required
                    rows={4}
                  ></textarea>
                </div>

                {/* Schedule Group */}
                <div className="pt-6 border-t border-outline-variant">
                  <div className="space-y-2 md:w-1/2">
                    <label className="font-label-bold text-label-bold text-on-background block" htmlFor="date">
                      Tanggal Penjadwalan
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 outline-none transition-all"
                      id="date"
                      name="date"
                      required
                      type="date"
                      min={today}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-8">
                  <p className="mb-4 font-body-sm text-body-sm text-on-surface-variant">
                    Dengan mengirim formulir, Anda menyetujui penggunaan data ini untuk menangani
                    permintaan servis sesuai <a href="/kebijakan-privasi" className="text-primary underline">kebijakan privasi</a>.
                  </p>
                  <button
                    className="w-full md:w-auto bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="material-symbols-outlined animate-spin" aria-hidden="true">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined" data-icon="send" aria-hidden="true">send</span>
                    )}
                    {isSubmitting ? "Mengirim..." : "Kirim Permintaan Servis"}
                  </button>
                </div>
              </form>
            ) : (
              /* Success State */
              <div
                className="absolute inset-0 bg-surface z-10 flex flex-col items-center justify-center p-8 text-center"
                id="success-message"
              >
                <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                  <span
                    className="material-symbols-outlined text-[40px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-background mb-4">Permintaan Diterima!</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">
                  Simpan ID servis berikut untuk memeriksa status. Tim akan meninjau permintaan dan
                  menghubungi Anda pada jam operasional.
                </p>
                <p className="mb-8 rounded-xl bg-surface-container-low px-5 py-3 font-mono text-lg font-bold text-on-surface">
                  {confirmation.trackingId}
                </p>
                <a
                  className="bg-[#25D366] text-white font-label-bold text-label-bold px-8 py-4 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Lanjutkan obrolan ke WhatsApp di tab baru"
                >
                  <span className="material-symbols-outlined" data-icon="forum" aria-hidden="true">
                    forum
                  </span>
                  Lanjut ke WhatsApp
                </a>
                <button
                  className="mt-6 text-primary font-label-bold text-label-bold hover:underline cursor-pointer"
                  onClick={handleReset}
                >
                  Buat Permintaan Baru
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Trust Card 1 */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 flex flex-col gap-4 hover:border-primary transition-colors group shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" data-icon="verified" aria-hidden="true">
                  verified
                </span>
              </div>
              <div>
                <h3 className="font-label-bold text-label-bold text-on-background">Diagnosis sebelum pengerjaan</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Ruang lingkup dan estimasi dikonfirmasi terlebih dahulu.</p>
              </div>
            </div>
          </div>

          {/* Trust Card 2 */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 flex flex-col gap-4 hover:border-primary transition-colors group shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" data-icon="security" aria-hidden="true">
                  security
                </span>
              </div>
              <div>
                <h3 className="font-label-bold text-label-bold text-on-background">Ketentuan tertulis</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Cakupan garansi mengikuti pekerjaan dan nota servis.</p>
              </div>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm">
            <h3 className="font-headline-md text-headline-md text-on-background mb-4">Jam Operasional</h3>
            <ul className="space-y-2 font-body-md text-body-md text-on-surface-variant">
              <li className="flex justify-between border-b border-outline-variant pb-2">
                <span>Senin - Sabtu</span>
                <span className="font-label-bold text-on-background">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between border-b border-outline-variant pb-2">
                <span>Minggu</span>
                <span className="font-label-bold text-error">Tutup</span>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}

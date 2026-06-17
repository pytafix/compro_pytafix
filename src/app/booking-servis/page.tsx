"use client";

import { useState } from "react";

export default function BookingServis() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim data.");
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="min-h-screen px-4 md:px-8 lg:px-margin-desktop py-12 md:py-16 lg:py-24 max-w-container-max mx-auto flex-grow">
      {/* Header Section */}
      <header className="mb-12 text-center md:text-left">
        <h1 className="font-headline-xl text-headline-xl text-on-background mb-4">Jadwalkan Perbaikan Anda</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Isi formulir di bawah ini untuk memulai proses servis. Tim teknisi ahli kami akan segera menghubungi Anda untuk konfirmasi dan estimasi awal.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter">
        {/* Form Area (Bento Grid Style) */}
        <div className="lg:col-span-8">
          <div className="bg-surface rounded-xl border border-outline-variant p-6 md:p-8 relative overflow-hidden h-full">
            {!isSuccess ? (
              <form className="space-y-6" id="service-form" onSubmit={handleSubmit}>
                {/* Personal Info Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-bold text-label-bold text-on-background block" htmlFor="name">
                      Nama Lengkap
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
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
                      className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
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
                      className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
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
                    <label className="font-label-bold text-label-bold text-on-background block" htmlFor="service_type">
                      Jenis Layanan
                    </label>
                    <select
                      className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
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
                      className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
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
                  <button
                    className="w-full md:w-auto bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded hover:bg-primary-container transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined" data-icon="send">
                      send
                    </span>
                    Kirim Permintaan Servis
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
                  >
                    check_circle
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-background mb-4">Permintaan Diterima!</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">
                  Terima kasih. Detail permintaan Anda telah kami rekam. Untuk mempercepat proses, silakan lanjutkan obrolan melalui WhatsApp agar tim kami dapat langsung merespon.
                </p>
                <a
                  className="bg-[#25D366] text-white font-label-bold text-label-bold px-8 py-4 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  href="https://wa.me/1234567890?text=Halo%20Pytafix,%20saya%20telah%20mengisi%20form%20booking."
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="material-symbols-outlined" data-icon="forum">
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
          <div className="bg-surface rounded-xl border border-outline-variant p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" data-icon="verified">
                  verified
                </span>
              </div>
              <div>
                <h3 className="font-label-bold text-label-bold text-on-background">Teknisi Bersertifikat</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Tim ahli dengan pengalaman &gt;5 tahun.</p>
              </div>
            </div>
          </div>

          {/* Trust Card 2 */}
          <div className="bg-surface rounded-xl border border-outline-variant p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" data-icon="security">
                  security
                </span>
              </div>
              <div>
                <h3 className="font-label-bold text-label-bold text-on-background">Garansi Resmi</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Hingga 90 hari untuk sparepart & jasa.</p>
              </div>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="bg-surface rounded-xl border border-outline-variant p-6">
            <h3 className="font-headline-md text-headline-md text-on-background mb-4">Jam Operasional</h3>
            <ul className="space-y-2 font-body-md text-body-md text-on-surface-variant">
              <li className="flex justify-between border-b border-outline-variant pb-2">
                <span>Senin - Jumat</span>
                <span className="font-label-bold text-on-background">09:00 - 20:00</span>
              </li>
              <li className="flex justify-between border-b border-outline-variant pb-2">
                <span>Sabtu</span>
                <span className="font-label-bold text-on-background">10:00 - 18:00</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Minggu</span>
                <span className="font-label-bold text-error">Tutup</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

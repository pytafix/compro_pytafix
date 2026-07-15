"use client";

import { useState } from "react";
import { toast } from "sonner";
export default function KlaimGaransiPage() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    trackingId: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/warranty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan");

      setIsSuccess(true);
      toast.success("Klaim garansi berhasil diajukan!");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow bg-background">
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop text-center border-b border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4 md:font-headline-xl md:text-headline-xl font-headline-lg-mobile text-headline-lg-mobile">
            Klaim Garansi Servis
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Masih dalam masa garansi dan perangkat mengalami kendala yang sama? Isi form di bawah ini untuk mengajukan klaim garansi tanpa biaya tambahan.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-3xl mx-auto">
        {isSuccess ? (
          <div className="bg-secondary-container p-8 rounded-2xl text-center border border-secondary/20">
            <span className="material-symbols-outlined text-[64px] text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <h2 className="font-headline-md text-headline-md text-on-secondary-container mb-4">Pengajuan Berhasil</h2>
            <p className="font-body-lg text-body-lg text-on-secondary-container/80 mb-8 max-w-lg mx-auto">
              Tim kami telah menerima pengajuan garansi Anda. Kami akan segera menghubungi Anda melalui WhatsApp untuk proses verifikasi selanjutnya.
            </p>
            <button 
              onClick={() => { setIsSuccess(false); setFormData({name:'', whatsapp:'', trackingId:'', description:''}) }}
              className="bg-secondary text-on-secondary font-label-bold text-label-bold px-8 py-4 rounded hover:opacity-90 transition-opacity cursor-pointer inline-flex"
            >
              Ajukan Klaim Lainnya
            </button>
          </div>
        ) : (
          <div className="bg-surface p-6 md:p-8 rounded-2xl border border-outline-variant shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant mb-2">
                <p className="font-body-sm text-on-surface-variant">
                  <span className="font-label-bold text-primary">Penting:</span> Pastikan Anda masih memiliki Nota Servis (Invoice) atau mengetahui ID Servis Anda untuk memproses klaim.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-label-md text-on-surface">Nama Lengkap *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
                    placeholder="Nama Anda"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="whatsapp" className="font-label-md text-on-surface">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
                    placeholder="Contoh: 08123456789"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="trackingId" className="font-label-md text-on-surface">ID Servis / No. Nota *</label>
                <input
                  type="text"
                  id="trackingId"
                  required
                  value={formData.trackingId}
                  onChange={(e) => setFormData({ ...formData, trackingId: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
                  placeholder="Contoh: PYT-2026-A1B2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="font-label-md text-on-surface">Kendala yang Dialami *</label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface resize-y"
                  placeholder="Ceritakan detail masalah yang muncul setelah servis..."
                />
              </div>

              <div className="pt-4 border-t border-outline-variant">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Memproses...</>
                  ) : (
                    <>
                      Kirim Pengajuan Klaim <span className="material-symbols-outlined text-[20px]">send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}

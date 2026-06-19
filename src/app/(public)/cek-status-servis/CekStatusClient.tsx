"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function CekStatusClient() {
  const [resi, setResi] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusData, setStatusData] = useState<Record<string, any> | null>(null);

  const handleSearch = async () => {
    if (resi.trim()) {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/status?trackingId=${resi}`);
        if (res.ok) {
          const data = await res.json();
          setStatusData(data);
          setHasSearched(true);
          toast.success("Data servis ditemukan.");
        } else {
          toast.error("Resi tidak ditemukan.");
          setHasSearched(false);
          setStatusData(null);
        }
      } catch (err) {
        console.error(err);
        toast.error("Terjadi kesalahan koneksi.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="flex-grow w-full pb-24">
      {/* Header Section */}
      <section className="relative w-full bg-gradient-to-b from-primary-container/30 to-background pt-20 pb-24 px-4 md:px-8 text-center mb-12">
        <h1 className="font-headline-lg text-headline-lg md:font-headline-xl md:text-headline-xl text-on-background mb-6 tracking-tight">
          Cek Status <span className="text-primary">Servis</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Masukkan Nomor Servis atau Resi Anda untuk melacak perkembangan perbaikan perangkat Anda secara real-time.
        </p>
      </section>

      {/* Input Section */}
      <div className="max-w-2xl mx-auto mb-16 bg-surface border border-outline-variant/50 rounded-2xl p-4 md:p-6 shadow-xl shadow-primary/5 transition-all hover:shadow-primary/10">
        <label className="block font-label-bold text-label-bold text-on-background mb-4" htmlFor="resi-input">
          Masukkan Nomor Servis/Resi
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">receipt_long</span>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 pl-12 pr-4 py-4 outline-none transition-all font-body-lg text-body-lg"
              id="resi-input"
              placeholder="Contoh: PYT-2024-10X"
              type="text"
              value={resi}
              onChange={(e) => setResi(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>
          <button
            className="bg-primary text-on-primary font-label-lg text-label-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all cursor-pointer"
            onClick={handleSearch}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              search
            </span>
            Cek
          </button>
        </div>
      </div>

      {/* Results Section (Visible after search) */}
      {hasSearched && statusData && (
        <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter">
          {/* Tracker Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface border border-outline-variant/50 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="font-headline-md text-headline-md text-primary mb-8 border-b border-outline-variant pb-4">
                Status Perbaikan
              </h2>
              <div className="relative">
                {/* Background Track */}
                <div className="absolute left-[23px] top-8 bottom-8 w-[2px] bg-outline-variant/40"></div>
                {/* Active Progress Fill */}
                <div 
                  className="absolute left-[23px] top-8 w-[2px] bg-primary transition-all duration-700 ease-in-out" 
                  style={{ height: `${(Math.max(0, ["DITERIMA", "DIAGNOSA", "DIKERJAKAN", "SELESAI"].indexOf(statusData.status)) / 3) * 100}%` }}
                ></div>

                {[
                  {
                    id: "DITERIMA",
                    title: "Diterima",
                    desc: "Perangkat telah diterima oleh teknisi kami dan masuk dalam antrean.",
                    icon: "check",
                    time: statusData.createdAt
                  },
                  {
                    id: "DIAGNOSA",
                    title: "Diagnosa",
                    desc: "Pengecekan menyeluruh untuk mengidentifikasi kerusakan.",
                    icon: "check",
                    time: statusData.diagnosedAt
                  },
                  {
                    id: "DIKERJAKAN",
                    title: "Sedang Dikerjakan",
                    desc: "Proses perbaikan dan penggantian komponen sedang berlangsung.",
                    icon: "build",
                    time: statusData.workingAt,
                    est: true
                  },
                  {
                    id: "SELESAI",
                    title: "Selesai",
                    desc: "Perbaikan selesai dan perangkat siap diambil atau dikirim.",
                    icon: "inventory_2",
                    time: statusData.completedAt
                  }
                ].map((step, idx) => {
                  const statuses = ["DITERIMA", "DIAGNOSA", "DIKERJAKAN", "SELESAI"];
                  const currentIdx = statuses.indexOf(statusData.status);
                  
                  const isDone = idx < currentIdx;
                  const isActive = idx === currentIdx;
                  const isPending = idx > currentIdx;
                  
                  return (
                    <div key={step.id} className="relative flex items-start gap-6 mb-8 last:mb-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 shrink-0 border-[3px] transition-all duration-500 ${
                        isDone 
                          ? 'bg-primary border-primary text-on-primary shadow-md' 
                          : isActive 
                            ? 'bg-surface border-primary text-primary shadow-lg ring-4 ring-primary/20 scale-110' 
                            : 'bg-surface border-outline-variant/50 text-outline'
                      }`}>
                        <span className="material-symbols-outlined" style={isDone || isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                          {step.icon}
                        </span>
                      </div>
                      <div className="pt-2">
                        <h3 className={`font-label-bold text-label-bold ${isActive ? 'text-primary' : isPending ? 'text-outline' : 'text-on-background'}`}>
                          {step.title}
                        </h3>
                        <p className={`font-body-md text-body-md mt-1 ${isActive ? 'text-on-background' : isPending ? 'text-outline' : 'text-on-surface-variant'}`}>
                          {step.desc}
                        </p>
                        {step.time && (
                          <span className="font-label-sm text-label-sm text-outline mt-2 block">
                            {new Date(step.time).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        )}
                        {step.est && isActive && statusData.scheduleDate && (
                          <div className="bg-surface-container-low p-4 rounded mt-3 border border-outline-variant">
                            <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px]">info</span>
                              Jadwal Servis: {new Date(statusData.scheduleDate).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Device Details */}
            <div className="bg-surface border border-outline-variant/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">devices</span>
                Detail Perangkat
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">Tipe Perangkat</span>
                  <span className="font-body-md text-body-md text-on-background font-medium">{statusData.deviceType}</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">Keluhan Utama</span>
                  <span className="font-body-md text-body-md text-on-background">{statusData.problemDesc}</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">Nomor Resi</span>
                  <span className="font-body-md text-body-md text-on-background font-mono bg-surface-container px-2 py-1 rounded inline-block mt-1">
                    {statusData.trackingId}
                  </span>
                </div>
              </div>
            </div>

            {/* Technician Notes */}
            {statusData.technicianNotes && (
            <div className="bg-surface-container-low border border-primary/20 rounded-xl p-6 shadow-sm">
              <h3 className="font-label-bold text-label-bold text-on-background mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  assignment
                </span>
                Catatan Teknisi
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant italic">
                &quot;{statusData.technicianNotes}&quot;
              </p>
              {statusData.technicianName && (
              <div className="mt-4 pt-4 border-t border-outline-variant flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-bold text-label-bold">
                  {statusData.technicianName.charAt(0)}
                </div>
                <div>
                  <span className="font-label-bold text-label-bold text-on-background block">{statusData.technicianName}</span>
                  <span className="font-label-sm text-label-sm text-outline">Technician</span>
                </div>
              </div>
              )}
            </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

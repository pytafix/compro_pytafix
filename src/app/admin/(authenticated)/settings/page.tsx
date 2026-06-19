"use client";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    terms: "",
    privacy: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setFormData({
          terms: data.terms || "",
          privacy: data.privacy || ""
        });
      }
    } catch (error) {
      toast.error("Gagal mengambil data pengaturan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Pengaturan berhasil disimpan");
      } else {
        toast.error("Gagal menyimpan pengaturan");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Legal & Kebijakan</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-on-surface-variant flex flex-col items-center">
            <span className="material-symbols-outlined animate-spin text-[32px] mb-4">progress_activity</span>
            <p>Memuat data...</p>
          </div>
        ) : (
          <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-2">Syarat & Ketentuan (Terms of Service)</label>
                <textarea 
                  rows={10} 
                  required
                  placeholder="Masukkan teks syarat & ketentuan di sini..."
                  value={formData.terms} 
                  onChange={e => setFormData({...formData, terms: e.target.value})} 
                  className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-2 focus:ring-primary outline-none"
                ></textarea>
                <p className="mt-2 text-on-surface-variant text-sm">Gunakan HTML atau teks biasa sesuai dengan format di website utama.</p>
              </div>

              <div className="border-t border-outline-variant pt-6">
                <label className="block font-label-bold text-label-bold text-on-surface mb-2">Kebijakan Privasi (Privacy Policy)</label>
                <textarea 
                  rows={10} 
                  required
                  placeholder="Masukkan teks kebijakan privasi di sini..."
                  value={formData.privacy} 
                  onChange={e => setFormData({...formData, privacy: e.target.value})} 
                  className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-2 focus:ring-primary outline-none"
                ></textarea>
                <p className="mt-2 text-on-surface-variant text-sm">Gunakan HTML atau teks biasa sesuai dengan format di website utama.</p>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="px-6 py-3 rounded font-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  {isSubmitting ? "Menyimpan..." : "Simpan Pengaturan"}
                </button>
              </div>

            </form>
          </div>
        )}
      </main>
    </div>
  );
}

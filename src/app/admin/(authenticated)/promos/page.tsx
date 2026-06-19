"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Promo {
  id: number;
  slug: string;
  badge: string;
  title: string;
  description: string;
  validUntil: string;
  terms: string;
  howToClaim: string;
  isActive: boolean;
  isFeatured: boolean;
}

export default function AdminPromos() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    slug: "",
    badge: "",
    title: "",
    description: "",
    validUntil: "",
    terms: "",
    howToClaim: "",
    isActive: true,
    isFeatured: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPromos = async (isRefresh = false) => {
    if (isRefresh) setIsLoading(true);
    try {
      const res = await fetch("/api/admin/promos");
      if (res.ok) {
        setPromos(await res.json());
      }
    } catch (error) {
      toast.error("Gagal mengambil data promo");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchPromos(false);
  }, []);

  const openModal = (promo?: Promo) => {
    if (promo) {
      setEditingId(promo.id);
      setFormData({
        slug: promo.slug || "",
        badge: promo.badge || "",
        title: promo.title || "",
        description: promo.description || "",
        validUntil: promo.validUntil || "",
        terms: promo.terms || "",
        howToClaim: promo.howToClaim || "",
        isActive: promo.isActive,
        isFeatured: promo.isFeatured
      });
    } else {
      setEditingId(null);
      setFormData({ 
        slug: "", 
        badge: "", 
        title: "", 
        description: "", 
        validUntil: "", 
        terms: "", 
        howToClaim: "", 
        isActive: true,
        isFeatured: false 
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingId ? `/api/admin/promos/${editingId}` : "/api/admin/promos";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(`Promo berhasil ${editingId ? "diperbarui" : "ditambahkan"}`);
        closeModal();
        fetchPromos();
      } else {
        toast.error("Gagal menyimpan data");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus promo ini?")) return;

    try {
      const res = await fetch(`/api/admin/promos/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Promo berhasil dihapus");
        fetchPromos();
      } else {
        toast.error("Gagal menghapus promo");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Promo</h2>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded text-on-primary font-label-bold text-label-bold hover:bg-on-primary-fixed-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tambah Promo
          </button>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant flex flex-col items-center">
              <span className="material-symbols-outlined animate-spin text-[32px] mb-4">progress_activity</span>
              <p>Memuat data...</p>
            </div>
          ) : promos.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">local_offer</span>
              <p className="font-body-lg">Belum ada data promo.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Info Promo</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Periode & Syarat</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-center">Status</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-center">Homepage (Featured)</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {promos.map((promo) => (
                  <tr key={promo.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-label-bold text-on-surface mb-1">{promo.title}</span>
                        <span className="inline-block px-2 py-0.5 rounded text-xs bg-primary/10 text-primary w-fit font-label-sm border border-primary/20">
                          {promo.badge}
                        </span>
                        <p className="font-body-sm text-on-surface-variant truncate max-w-[200px] mt-2" title={promo.description}>
                          {promo.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-sm">
                        <span className="text-on-surface"><span className="font-label-bold">Berlaku sampai:</span> {promo.validUntil}</span>
                        <p className="text-on-surface-variant mt-1 line-clamp-2 max-w-[250px]" title={promo.terms}>
                          <span className="font-label-bold">S&K:</span> {promo.terms}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm ${promo.isActive ? "bg-[#dcfce7] text-[#166534]" : "bg-error-container text-on-error-container"}`}>
                        {promo.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm ${promo.isFeatured ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant"}`}>
                        {promo.isFeatured ? "Tampil" : "Sembunyi"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openModal(promo)} className="p-2 rounded-full hover:bg-secondary-container text-secondary transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(promo.id)} className="p-2 rounded-full hover:bg-error-container text-error transition-colors" title="Hapus">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-2xl rounded-xl shadow-xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                {editingId ? "Edit Promo" : "Tambah Promo Baru"}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="promo-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Judul Promo</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">URL Slug</label>
                    <input type="text" required placeholder="misal: promo-ramadhan-2026" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Badge (Label Singkat)</label>
                    <input type="text" required placeholder="misal: Diskon 20%" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Berlaku Sampai</label>
                    <input type="text" required placeholder="misal: 31 Desember 2026" value={formData.validUntil} onChange={e => setFormData({...formData, validUntil: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Deskripsi Singkat</label>
                  <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Syarat & Ketentuan</label>
                  <textarea required rows={3} placeholder="S&K berlaku..." value={formData.terms} onChange={e => setFormData({...formData, terms: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Cara Klaim</label>
                  <textarea required rows={3} placeholder="Langkah klaim promo..." value={formData.howToClaim} onChange={e => setFormData({...formData, howToClaim: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Status Visibilitas</label>
                    <select value={formData.isActive ? "true" : "false"} onChange={e => setFormData({...formData, isActive: e.target.value === "true"})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none">
                      <option value="true">Aktif (Ditampilkan)</option>
                      <option value="false">Nonaktif (Disembunyikan)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Tampilkan di Homepage?</label>
                    <select value={formData.isFeatured ? "true" : "false"} onChange={e => setFormData({...formData, isFeatured: e.target.value === "true"})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none">
                      <option value="true">Ya, Tampilkan</option>
                      <option value="false">Tidak</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3 mt-auto">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded font-label-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">Batal</button>
              <button type="submit" form="promo-form" disabled={isSubmitting} className="px-6 py-2 rounded font-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                {isSubmitting ? "Menyimpan..." : "Simpan Promo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Portfolio {
  id: number;
  title: string;
  description: string;
  deviceType: string;
  problemType: string;
  beforeImage: string;
  afterImage: string;
  completionDate: string | null;
}

export default function AdminPortfolios() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deviceType: "",
    problemType: "",
    beforeImage: "",
    afterImage: "",
    completionDate: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPortfolios = async (isRefresh = false) => {
    if (isRefresh) setIsLoading(true);
    try {
      const res = await fetch("/api/admin/portfolios");
      if (res.ok) {
        setPortfolios(await res.json());
      }
    } catch (error) {
      toast.error("Gagal mengambil data portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios(false);
  }, []);

  const openModal = (portfolio?: Portfolio) => {
    if (portfolio) {
      setEditingId(portfolio.id);
      
      let formattedDate = "";
      if (portfolio.completionDate) {
        // Convert to YYYY-MM-DD for date input
        formattedDate = new Date(portfolio.completionDate).toISOString().split('T')[0];
      }

      setFormData({
        title: portfolio.title,
        description: portfolio.description,
        deviceType: portfolio.deviceType,
        problemType: portfolio.problemType,
        beforeImage: portfolio.beforeImage,
        afterImage: portfolio.afterImage,
        completionDate: formattedDate
      });
    } else {
      setEditingId(null);
      setFormData({ 
        title: "", 
        description: "", 
        deviceType: "", 
        problemType: "", 
        beforeImage: "", 
        afterImage: "", 
        completionDate: "" 
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'beforeImage' | 'afterImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      toast.loading("Mengunggah gambar...", { id: "upload" });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const { url } = await res.json();
        setFormData(prev => ({ ...prev, [field]: url }));
        toast.success("Gambar berhasil diunggah", { id: "upload" });
      } else {
        toast.error("Gagal mengunggah gambar", { id: "upload" });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan", { id: "upload" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingId ? `/api/admin/portfolios/${editingId}` : "/api/admin/portfolios";
      const method = editingId ? "PUT" : "POST";

      const dataToSubmit = {
        ...formData,
        completionDate: formData.completionDate ? new Date(formData.completionDate).toISOString() : null
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (res.ok) {
        toast.success(`Portfolio berhasil ${editingId ? "diperbarui" : "ditambahkan"}`);
        closeModal();
        fetchPortfolios();
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
    if (!confirm("Apakah Anda yakin ingin menghapus portfolio ini?")) return;

    try {
      const res = await fetch(`/api/admin/portfolios/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Portfolio berhasil dihapus");
        fetchPortfolios();
      } else {
        toast.error("Gagal menghapus portfolio");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Portfolio</h2>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded text-on-primary font-label-bold text-label-bold hover:bg-on-primary-fixed-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tambah Portfolio
          </button>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant flex flex-col items-center">
              <span className="material-symbols-outlined animate-spin text-[32px] mb-4">progress_activity</span>
              <p>Memuat data...</p>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">photo_library</span>
              <p className="font-body-lg">Belum ada data portfolio.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Info Portfolio</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Device / Problem</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-center">Tgl Selesai</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {portfolios.map((portfolio) => (
                  <tr key={portfolio.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                          {portfolio.beforeImage ? (
                            <img src={portfolio.beforeImage} alt="Before" className="w-10 h-10 rounded-full object-cover border-2 border-surface relative z-10" title="Sebelum" />
                          ) : null}
                          {portfolio.afterImage ? (
                            <img src={portfolio.afterImage} alt="After" className="w-10 h-10 rounded-full object-cover border-2 border-surface relative z-20" title="Sesudah" />
                          ) : null}
                        </div>
                        <div>
                          <span className="block font-label-bold text-on-surface">{portfolio.title}</span>
                          <span className="block font-body-sm text-on-surface-variant truncate max-w-[200px]">{portfolio.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-label-bold text-on-surface">{portfolio.deviceType}</p>
                      <p className="font-body-sm text-on-surface-variant">{portfolio.problemType}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-body-sm text-on-surface-variant">
                        {portfolio.completionDate 
                          ? new Date(portfolio.completionDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })
                          : "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openModal(portfolio)} className="p-2 rounded-full hover:bg-secondary-container text-secondary transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(portfolio.id)} className="p-2 rounded-full hover:bg-error-container text-error transition-colors" title="Hapus">
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
                {editingId ? "Edit Portfolio" : "Tambah Portfolio Baru"}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="portfolio-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Judul Portfolio</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="misal: Perbaikan LCD iPhone 13" />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Tanggal Selesai</label>
                    <input type="date" value={formData.completionDate} onChange={e => setFormData({...formData, completionDate: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Jenis Perangkat</label>
                    <input type="text" required value={formData.deviceType} onChange={e => setFormData({...formData, deviceType: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="misal: iPhone 13 Pro" />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Jenis Kerusakan</label>
                    <input type="text" required value={formData.problemType} onChange={e => setFormData({...formData, problemType: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="misal: LCD Pecah" />
                  </div>
                </div>
                
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Deskripsi Singkat</label>
                  <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="Ceritakan singkat tentang perbaikan ini..."></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Gambar Sebelum (Before)</label>
                    <div className="flex gap-2">
                      <input type="text" required placeholder="URL Gambar..." value={formData.beforeImage} onChange={e => setFormData({...formData, beforeImage: e.target.value})} className="flex-1 bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                      <label className="bg-surface-container px-4 py-2 rounded font-label-bold text-label-bold cursor-pointer hover:bg-surface-container-high transition-colors flex items-center justify-center">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'beforeImage')} />
                        Upload
                      </label>
                    </div>
                    {formData.beforeImage && (
                      <div className="mt-2 border border-outline-variant rounded overflow-hidden h-32">
                        <img src={formData.beforeImage} alt="Preview Before" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Gambar Sesudah (After)</label>
                    <div className="flex gap-2">
                      <input type="text" required placeholder="URL Gambar..." value={formData.afterImage} onChange={e => setFormData({...formData, afterImage: e.target.value})} className="flex-1 bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                      <label className="bg-surface-container px-4 py-2 rounded font-label-bold text-label-bold cursor-pointer hover:bg-surface-container-high transition-colors flex items-center justify-center">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'afterImage')} />
                        Upload
                      </label>
                    </div>
                    {formData.afterImage && (
                      <div className="mt-2 border border-outline-variant rounded overflow-hidden h-32">
                        <img src={formData.afterImage} alt="Preview After" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded font-label-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">Batal</button>
              <button type="submit" form="portfolio-form" disabled={isSubmitting} className="px-6 py-2 rounded font-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                {isSubmitting ? "Menyimpan..." : "Simpan Portfolio"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

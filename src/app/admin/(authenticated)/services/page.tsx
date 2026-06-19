"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    content: "",
    icon: "",
    imageUrl: "",
    isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = async (isRefresh = false) => {
    if (isRefresh) setIsLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        setServices(await res.json());
      }
    } catch (error) {
      toast.error("Gagal mengambil data layanan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchServices(false);
  }, []);

  const openModal = (service?: Service) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        slug: (service as Record<string, any>).slug || "",
        title: service.title,
        description: service.description,
        content: (service as Record<string, any>).content || "",
        icon: service.icon || "",
        imageUrl: service.imageUrl || "",
        isActive: service.isActive
      });
    } else {
      setEditingId(null);
      setFormData({ slug: "", title: "", description: "", content: "", icon: "", imageUrl: "", isActive: true });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData(prev => ({ ...prev, imageUrl: url }));
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
      const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(`Layanan berhasil ${editingId ? "diperbarui" : "ditambahkan"}`);
        closeModal();
        fetchServices();
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
    if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;

    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Layanan berhasil dihapus");
        fetchServices();
      } else {
        toast.error("Gagal menghapus layanan");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Layanan</h2>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded text-on-primary font-label-bold text-label-bold hover:bg-on-primary-fixed-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tambah Layanan
          </button>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant flex flex-col items-center">
              <span className="material-symbols-outlined animate-spin text-[32px] mb-4">progress_activity</span>
              <p>Memuat data...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">build</span>
              <p className="font-body-lg">Belum ada data layanan.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Info Layanan</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Deskripsi</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-center">Status</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {service.imageUrl ? (
                          <img src={service.imageUrl} alt={service.title} className="w-12 h-12 rounded object-cover border border-outline-variant" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-primary border border-outline-variant">
                            <span className="material-symbols-outlined">{service.icon || "build"}</span>
                          </div>
                        )}
                        <span className="font-label-bold text-on-surface">{service.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-body-sm text-on-surface-variant truncate" title={service.description}>
                        {service.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm ${service.isActive ? "bg-[#dcfce7] text-[#166534]" : "bg-error-container text-on-error-container"}`}>
                        {service.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openModal(service)} className="p-2 rounded-full hover:bg-secondary-container text-secondary transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="p-2 rounded-full hover:bg-error-container text-error transition-colors" title="Hapus">
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
          <div className="bg-surface w-full max-w-xl rounded-xl shadow-xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                {editingId ? "Edit Layanan" : "Tambah Layanan Baru"}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="service-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Nama Layanan</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">URL Slug (SEO)</label>
                    <input type="text" required placeholder="misal: perbaikan-laptop-malang" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Deskripsi Singkat (Katalog)</label>
                  <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Konten Detail (SEO Landing Page)</label>
                  <textarea rows={4} placeholder="Teks panjang untuk keperluan SEO halaman detail layanan..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Nama Ikon (Material Symbols)</label>
                    <input type="text" placeholder="e.g. computer, smartphone" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Status Visibilitas</label>
                    <select value={formData.isActive ? "true" : "false"} onChange={e => setFormData({...formData, isActive: e.target.value === "true"})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none">
                      <option value="true">Aktif (Ditampilkan)</option>
                      <option value="false">Nonaktif (Disembunyikan)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Gambar/Foto (Opsional)</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="URL Gambar..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="flex-1 bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                    <label className="bg-surface-container px-4 py-2 rounded font-label-bold text-label-bold cursor-pointer hover:bg-surface-container-high transition-colors flex items-center justify-center">
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                      Upload
                    </label>
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-2 border border-outline-variant rounded overflow-hidden w-24 h-24">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded font-label-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">Batal</button>
              <button type="submit" form="service-form" disabled={isSubmitting} className="px-6 py-2 rounded font-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                {isSubmitting ? "Menyimpan..." : "Simpan Layanan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

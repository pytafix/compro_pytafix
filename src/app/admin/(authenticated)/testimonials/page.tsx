"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
    isFeatured: false,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (!res.ok) throw new Error("Gagal mengambil data testimoni");
      const data = await res.json();
      setTestimonials(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        rating: item.rating,
        comment: item.comment,
        isFeatured: item.isFeatured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        rating: 5,
        comment: "",
        isFeatured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem 
        ? `/api/admin/testimonials/${editingItem.id}` 
        : "/api/admin/testimonials";
      
      const res = await fetch(url, {
        method: editingItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan testimoni");
      
      toast.success(`Testimoni berhasil ${editingItem ? "diupdate" : "ditambahkan"}`);
      handleCloseModal();
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus testimoni");
      toast.success("Testimoni berhasil dihapus");
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface-variant font-body-md">Loading testimoni...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline-md text-on-surface">Manajemen Testimoni</h1>
          <p className="font-body-md text-on-surface-variant">Kelola ulasan dan penilaian pelanggan.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tambah Testimoni
        </button>
      </div>

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant font-label-bold text-on-surface">
              <th className="p-4">Tanggal</th>
              <th className="p-4">Nama Pelanggan</th>
              <th className="p-4">Rating</th>
              <th className="p-4 w-1/3">Komentar</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-on-surface-variant">
            {testimonials.map((item) => (
              <tr key={item.id} className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors">
                <td className="p-4">{new Date(item.createdAt).toLocaleDateString("id-ID")}</td>
                <td className="p-4 font-label-bold text-on-surface">{item.name}</td>
                <td className="p-4">
                  <div className="flex text-amber-500 text-sm">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <p className="line-clamp-2" title={item.comment}>{item.comment}</p>
                </td>
                <td className="p-4">
                  {item.isFeatured ? (
                    <span className="bg-primary-container text-on-primary-container px-2 py-1 rounded text-xs font-label-bold">Ya</span>
                  ) : (
                    <span className="bg-surface-container text-on-surface-variant px-2 py-1 rounded text-xs font-label-bold">Tidak</span>
                  )}
                </td>
                <td className="p-4 flex items-center gap-2">
                  <button onClick={() => handleOpenModal(item)} className="text-secondary hover:bg-secondary-container/20 p-2 rounded transition-colors" title="Edit">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-error hover:bg-error-container/20 p-2 rounded transition-colors" title="Hapus">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-on-surface-variant font-body-md">
                  Belum ada data testimoni.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-lg rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-outline-variant shrink-0">
              <h2 className="font-headline-sm text-on-surface">
                {editingItem ? "Edit Testimoni" : "Tambah Testimoni"}
              </h2>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Nama Pelanggan</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                  className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Komentar</label>
                <textarea
                  required
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                />
                <label htmlFor="isFeatured" className="font-label-md text-on-surface cursor-pointer">
                  Featured (Tampilkan di Beranda/Sorotan)
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-on-surface-variant font-label-bold hover:bg-surface-container rounded transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary font-label-bold rounded hover:opacity-90 transition-opacity"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

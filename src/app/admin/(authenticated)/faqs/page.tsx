"use client";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Faq {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFaqs = async (isRefresh = false) => {
    if (isRefresh) setIsLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      if (res.ok) {
        setFaqs(await res.json());
      }
    } catch (error) {
      toast.error("Gagal mengambil data FAQ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchFaqs(false);
  }, []);

  const openModal = (faq?: Faq) => {
    if (faq) {
      setEditingId(faq.id);
      setFormData({
        question: faq.question || "",
        answer: faq.answer || "",
        isActive: faq.isActive
      });
    } else {
      setEditingId(null);
      setFormData({ 
        question: "", 
        answer: "", 
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingId ? `/api/admin/faqs/${editingId}` : "/api/admin/faqs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(`FAQ berhasil ${editingId ? "diperbarui" : "ditambahkan"}`);
        closeModal();
        fetchFaqs();
      } else {
        toast.error("Gagal menyimpan data");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) return;

    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("FAQ berhasil dihapus");
        fetchFaqs();
      } else {
        toast.error("Gagal menghapus FAQ");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen FAQ</h2>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded text-on-primary font-label-bold text-label-bold hover:bg-on-primary-fixed-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tambah FAQ
          </button>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton />
            </div>
          ) : faqs.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">help_center</span>
              <p className="font-body-lg">Belum ada data FAQ.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Pertanyaan</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Jawaban</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-center">Status</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4 w-1/3">
                      <p className="font-label-bold text-on-surface mb-1">{faq.question}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body-sm text-on-surface-variant whitespace-pre-wrap">{faq.answer}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm ${faq.isActive ? "bg-[#dcfce7] text-[#166534]" : "bg-error-container text-on-error-container"}`}>
                        {faq.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openModal(faq)} className="p-2 rounded-full hover:bg-secondary-container text-secondary transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(faq.id)} className="p-2 rounded-full hover:bg-error-container text-error transition-colors" title="Hapus">
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
                {editingId ? "Edit FAQ" : "Tambah FAQ Baru"}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="faq-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Pertanyaan</label>
                  <input type="text" required value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Jawaban</label>
                  <textarea required rows={5} value={formData.answer} onChange={e => setFormData({...formData, answer: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Status Visibilitas</label>
                  <select value={formData.isActive ? "true" : "false"} onChange={e => setFormData({...formData, isActive: e.target.value === "true"})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none">
                    <option value="true">Aktif (Ditampilkan)</option>
                    <option value="false">Nonaktif (Disembunyikan)</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3 mt-auto">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded font-label-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">Batal</button>
              <button type="submit" form="faq-form" disabled={isSubmitting} className="px-6 py-2 rounded font-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                {isSubmitting ? "Menyimpan..." : "Simpan FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

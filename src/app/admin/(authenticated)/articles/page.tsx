"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    author: "",
    publishedAt: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchArticles = async (isRefresh = false) => {
    if (isRefresh) setIsLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      if (res.ok) {
        setArticles(await res.json());
      }
    } catch (error) {
      toast.error("Gagal mengambil data artikel");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchArticles(false);
  }, []);

  const openModal = (article?: Article) => {
    if (article) {
      setEditingId(article.id);
      setFormData({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        imageUrl: article.imageUrl,
        author: article.author,
        publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : ""
      });
    } else {
      setEditingId(null);
      setFormData({
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        imageUrl: "",
        author: "",
        publishedAt: ""
      });
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
      const url = editingId ? `/api/admin/articles/${editingId}` : "/api/admin/articles";
      const method = editingId ? "PUT" : "POST";

      const submitData = {
        ...formData,
        publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        toast.success(`Artikel berhasil ${editingId ? "diperbarui" : "ditambahkan"}`);
        closeModal();
        fetchArticles();
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
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Artikel berhasil dihapus");
        fetchArticles();
      } else {
        toast.error("Gagal menghapus artikel");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Artikel</h2>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded text-on-primary font-label-bold text-label-bold hover:bg-on-primary-fixed-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tambah Artikel
          </button>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant flex flex-col items-center">
              <span className="material-symbols-outlined animate-spin text-[32px] mb-4">progress_activity</span>
              <p>Memuat data...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">article</span>
              <p className="font-body-lg">Belum ada data artikel.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Artikel</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Kutipan</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-center">Status Publikasi</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {article.imageUrl ? (
                          <img src={article.imageUrl} alt={article.title} className="w-12 h-12 rounded object-cover border border-outline-variant" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-primary border border-outline-variant">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                        <div>
                          <p className="font-label-bold text-on-surface">{article.title}</p>
                          <p className="font-body-sm text-on-surface-variant">{article.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-body-sm text-on-surface-variant truncate" title={article.excerpt}>
                        {article.excerpt}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {article.publishedAt ? (
                        <div className="flex flex-col items-center">
                          <span className="inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm bg-[#dcfce7] text-[#166534]">
                            Dipublikasi
                          </span>
                          <span className="text-xs mt-1 text-on-surface-variant">
                            {new Date(article.publishedAt).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm bg-surface-container-high text-on-surface-variant">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openModal(article)} className="p-2 rounded-full hover:bg-secondary-container text-secondary transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="p-2 rounded-full hover:bg-error-container text-error transition-colors" title="Hapus">
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
          <div className="bg-surface w-full max-w-3xl rounded-xl shadow-xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                {editingId ? "Edit Artikel" : "Tambah Artikel Baru"}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="article-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Judul Artikel</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">URL Slug (SEO)</label>
                    <input type="text" required placeholder="misal: tips-merawat-laptop" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Penulis</label>
                    <input type="text" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-on-surface mb-1">Tanggal Publikasi</label>
                    <input type="datetime-local" value={formData.publishedAt} onChange={e => setFormData({...formData, publishedAt: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                    <p className="text-xs text-on-surface-variant mt-1">Biarkan kosong jika ini adalah draft.</p>
                  </div>
                </div>
                
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Kutipan Singkat (Excerpt)</label>
                  <textarea required rows={2} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Konten Lengkap</label>
                  <textarea required rows={8} placeholder="Teks lengkap artikel..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-1">Gambar Utama</label>
                  <div className="flex gap-2">
                    <input type="text" required placeholder="URL Gambar..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="flex-1 bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                    <label className="bg-surface-container px-4 py-2 rounded font-label-bold text-label-bold cursor-pointer hover:bg-surface-container-high transition-colors flex items-center justify-center">
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                      Upload
                    </label>
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-2 border border-outline-variant rounded overflow-hidden w-full max-w-sm h-48">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded font-label-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">Batal</button>
              <button type="submit" form="article-form" disabled={isSubmitting} className="px-6 py-2 rounded font-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                {isSubmitting ? "Menyimpan..." : "Simpan Artikel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

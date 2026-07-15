"use client";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface MarketplaceLink {
  id?: string;
  marketplace: string;
  url: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  condition: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  isFeatured: boolean;
  isActive: boolean;
  marketplaceLinks: MarketplaceLink[];
}

const CATEGORIES = ["LAPTOP", "HP", "TABLET"];
const CONDITIONS = ["BARU", "BEKAS", "REFURBISHED"];
const MARKETPLACES = ["SHOPEE", "TOKOPEDIA", "BLIBLI", "LAZADA"];

const categoryLabels: Record<string, string> = {
  LAPTOP: "Laptop",
  HP: "HP / Smartphone",
  TABLET: "Tablet",
};

const conditionLabels: Record<string, string> = {
  BARU: "Baru",
  BEKAS: "Bekas",
  REFURBISHED: "Refurbished",
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "LAPTOP",
    condition: "BEKAS",
    description: "",
    price: 0,
    stock: 1,
    imageUrl: "",
    isFeatured: false,
    isActive: true,
  });
  const [marketplaceLinks, setMarketplaceLinks] = useState<MarketplaceLink[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async (isRefresh = false) => {
    if (isRefresh) setIsLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) setProducts(await res.json());
    } catch { toast.error("Gagal mengambil data produk"); }
    finally { setIsLoading(false); }
  };

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      try {
        const res = await fetch("/api/admin/products", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setProducts(data);
        } else {
          if (!cancelled) toast.error("Gagal mengambil data.");
        }
      } catch (err) {
        if (!cancelled) toast.error("Kesalahan jaringan.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadData();
    return () => { cancelled = true; };
  }, []);

  const openModal = (item?: Product) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        name: item.name,
        category: item.category,
        condition: item.condition,
        description: item.description || "",
        price: item.price,
        stock: item.stock,
        imageUrl: item.imageUrl || "",
        isFeatured: item.isFeatured,
        isActive: item.isActive,
      });
      setMarketplaceLinks(item.marketplaceLinks.map(l => ({ marketplace: l.marketplace, url: l.url })));
    } else {
      setEditingId(null);
      setFormData({ name: "", category: "LAPTOP", condition: "BEKAS", description: "", price: 0, stock: 1, imageUrl: "", isFeatured: false, isActive: true });
      setMarketplaceLinks([]);
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
      const res = await fetch("/api/admin/upload", { method: "POST", body: data });
      if (res.ok) {
        const { url } = await res.json();
        setFormData(prev => ({ ...prev, imageUrl: url }));
        toast.success("Gambar berhasil diunggah", { id: "upload" });
      } else toast.error("Gagal mengunggah gambar", { id: "upload" });
    } catch { toast.error("Terjadi kesalahan jaringan", { id: "upload" }); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: parseInt(formData.price.toString(), 10), stock: parseInt(formData.stock.toString(), 10), marketplaceLinks }),
      });
      if (res.ok) {
        toast.success(`Produk berhasil ${editingId ? "diperbarui" : "ditambahkan"}`);
        closeModal();
        fetchProducts();
      } else toast.error("Gagal menyimpan data");
    } catch { toast.error("Terjadi kesalahan"); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Produk berhasil dihapus"); fetchProducts(); }
      else toast.error("Gagal menghapus item");
    } catch { toast.error("Terjadi kesalahan"); }
  };

  const addMarketplaceLink = () => {
    setMarketplaceLinks(prev => [...prev, { marketplace: "SHOPEE", url: "" }]);
  };

  const removeMarketplaceLink = (index: number) => {
    setMarketplaceLinks(prev => prev.filter((_, i) => i !== index));
  };

  const updateMarketplaceLink = (index: number, field: "marketplace" | "url", value: string) => {
    setMarketplaceLinks(prev => prev.map((l, i) => i === index ? { ...l, [field]: value } : l));
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Jual Beli</h2>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary px-4 py-2 rounded text-on-primary font-label-bold text-label-bold hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tambah Produk
          </button>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          {isLoading ? (
            <div className="p-6"><TableSkeleton /></div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">devices</span>
              <p className="font-body-lg">Belum ada produk jual beli.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Item</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Kategori</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Kondisi</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Harga</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-center">Stok</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-center">Status</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded object-cover border border-outline-variant" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-primary border border-outline-variant">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                        <div>
                          <p className="font-label-bold text-on-surface">{item.name}</p>
                          {item.marketplaceLinks.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {item.marketplaceLinks.map(l => (
                                <span key={l.marketplace} className="text-xs bg-surface-container px-1.5 py-0.5 rounded font-label-sm text-on-surface-variant">{l.marketplace}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm bg-surface-container-high text-on-surface">
                        {categoryLabels[item.category] || item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm ${
                        item.condition === "BARU" ? "bg-primary-container text-on-primary-container" :
                        item.condition === "BEKAS" ? "bg-secondary-container text-on-secondary-container" :
                        "bg-tertiary-container text-on-tertiary-container"
                      }`}>
                        {conditionLabels[item.condition] || item.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-on-surface">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-label-bold ${item.stock > 0 ? "text-primary" : "text-error"}`}>
                        {item.stock} unit
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm ${item.isActive ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant"}`}>
                        {item.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openModal(item)} className="p-2 rounded-full hover:bg-secondary-container text-secondary transition-colors" title="Edit" aria-label="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 rounded-full hover:bg-error-container text-error transition-colors" title="Hapus" aria-label="Hapus">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-2xl rounded-xl shadow-xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                {editingId ? "Edit Produk" : "Tambah Produk Jual Beli"}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer" aria-label="Tutup">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="product-name" className="block font-label-bold text-label-bold text-on-surface mb-1">Nama Produk</label>
                  <input id="product-name" type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="Contoh: MacBook Pro 2019" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="product-category" className="block font-label-bold text-label-bold text-on-surface mb-1">Kategori</label>
                    <select id="product-category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none">
                      {CATEGORIES.map(c => <option key={c} value={c}>{categoryLabels[c]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="product-condition" className="block font-label-bold text-label-bold text-on-surface mb-1">Kondisi</label>
                    <select id="product-condition" value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none">
                      {CONDITIONS.map(c => <option key={c} value={c}>{conditionLabels[c]}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="product-price" className="block font-label-bold text-label-bold text-on-surface mb-1">Harga (Rupiah)</label>
                    <input id="product-price" type="number" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label htmlFor="product-stock" className="block font-label-bold text-label-bold text-on-surface mb-1">Stok</label>
                    <input id="product-stock" type="number" required min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="product-description" className="block font-label-bold text-label-bold text-on-surface mb-1">Deskripsi</label>
                  <textarea id="product-description" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="Spesifikasi lengkap produk..." />
                </div>

                <div>
                  <label htmlFor="product-imageUrl" className="block font-label-bold text-label-bold text-on-surface mb-1">Foto Produk</label>
                  <div className="flex gap-2">
                    <input id="product-imageUrl" type="text" placeholder="URL Gambar..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="flex-1 bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                    <label htmlFor="product-imageUpload" className="bg-surface-container px-4 py-2 rounded font-label-bold text-label-bold cursor-pointer hover:bg-surface-container-high transition-colors flex items-center justify-center">
                      <input id="product-imageUpload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                      Upload
                    </label>
                  </div>
                  {formData.imageUrl && <div className="mt-2 border border-outline-variant rounded overflow-hidden w-24 h-24"><img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" /></div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="product-isFeatured" className="block font-label-bold text-label-bold text-on-surface mb-1">Tampilkan di Homepage?</label>
                    <select id="product-isFeatured" value={formData.isFeatured ? "true" : "false"} onChange={e => setFormData({...formData, isFeatured: e.target.value === "true"})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none">
                      <option value="true">Ya</option>
                      <option value="false">Tidak</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="product-isActive" className="block font-label-bold text-label-bold text-on-surface mb-1">Status</label>
                    <select id="product-isActive" value={formData.isActive ? "true" : "false"} onChange={e => setFormData({...formData, isActive: e.target.value === "true"})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none">
                      <option value="true">Aktif</option>
                      <option value="false">Nonaktif</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-label-bold text-label-bold text-on-surface">Link Marketplace</label>
                    <button type="button" onClick={addMarketplaceLink} className="text-sm text-primary hover:underline font-label-bold">+ Tambah Link</button>
                  </div>
                  <div className="space-y-2">
                    {marketplaceLinks.length === 0 && (
                       <p className="text-sm text-on-surface-variant font-body-sm">Belum ada link marketplace. Klik &quot;+ Tambah Link&quot; untuk menambahkan.</p>
                    )}
                    {marketplaceLinks.map((link, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <select value={link.marketplace} onChange={e => updateMarketplaceLink(idx, "marketplace", e.target.value)} className="bg-surface border border-outline-variant rounded px-2 py-2 font-body-sm focus:ring-2 focus:ring-primary outline-none w-36">
                          {MARKETPLACES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <input type="url" required placeholder="https://..." value={link.url} onChange={e => updateMarketplaceLink(idx, "url", e.target.value)} className="flex-1 bg-surface border border-outline-variant rounded px-3 py-2 font-body-sm focus:ring-2 focus:ring-primary outline-none" />
                        <button type="button" onClick={() => removeMarketplaceLink(idx)} className="text-error hover:bg-error-container/20 p-2 rounded transition-colors cursor-pointer" aria-label="Hapus tautan marketplace">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded font-label-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">Batal</button>
              <button type="submit" form="product-form" disabled={isSubmitting} className="px-6 py-2 rounded font-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTACT, MARKETPLACES } from '@/lib/config';

interface MarketplaceLink {
  marketplace: string;
  url: string;
}

interface Sparepart {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  condition: string | null;
  marketplaceLinks: MarketplaceLink[];
}

interface Props {
  initialSpareparts: Sparepart[];
}

const CONDITIONS = ["Semua", "OEM", "Original", "Compatible"];
const SORT_OPTIONS = [
  { value: "terbaru", label: "Terbaru" },
  { value: "termurah", label: "Termurah" },
  { value: "termahal", label: "Termahal" },
  { value: "stok", label: "Stok Terbanyak" },
];

export function SparepartClient({ initialSpareparts }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedCondition, setSelectedCondition] = useState("Semua");
  const [sortBy, setSortBy] = useState("terbaru");

  const categories = useMemo(() => {
    const cats = new Set(initialSpareparts.map(s => s.category));
    return ["Semua", ...Array.from(cats)];
  }, [initialSpareparts]);

  const filteredSpareparts = useMemo(() => {
    let result = initialSpareparts.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
      const matchesCondition = selectedCondition === "Semua" || item.condition === selectedCondition;
      return matchesSearch && matchesCategory && matchesCondition;
    });

    switch (sortBy) {
      case "termurah":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "termahal":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "stok":
        result = [...result].sort((a, b) => b.stock - a.stock);
        break;
      case "terbaru":
      default:
        break;
    }

    return result;
  }, [initialSpareparts, searchQuery, selectedCategory, selectedCondition, sortBy]);

  return (
    <>
      <section className="px-6 -mt-8 relative z-20 max-w-5xl mx-auto mb-12">
        <div className="bg-surface p-4 md:p-6 rounded-2xl shadow-lg border border-outline-variant flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              id="sparepart-search"
              type="text"
              placeholder="Cari sparepart (Contoh: RAM 8GB, SSD 512GB...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-lg text-on-surface"
            />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-label-bold text-label-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-on-primary shadow-md"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Condition pills */}
            {selectedCondition !== "Semua" || initialSpareparts.some(s => s.condition) ? (
              <>
                <div className="h-6 w-px bg-outline-variant hidden md:block" />
                <div className="flex flex-wrap gap-2">
                  {CONDITIONS.filter(c => c === "Semua" || initialSpareparts.some(s => s.condition === c)).map(cond => (
                    <button
                      key={cond}
                      onClick={() => setSelectedCondition(cond)}
                      className={`px-4 py-2 rounded-full font-label-bold text-label-sm transition-all ${
                        selectedCondition === cond
                          ? "bg-primary text-on-primary shadow-md"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {/* Sort */}
            <div className="ml-auto">
              <select id="sparepart-sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 bg-surface-container-high border border-outline rounded-full font-label-bold text-label-sm text-on-surface focus:border-primary outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto mb-4">
        <p className="font-body-sm text-on-surface-variant">
          Menampilkan {filteredSpareparts.length} dari {initialSpareparts.length} sparepart
        </p>
      </section>

      <section className="py-8 px-6 max-w-7xl mx-auto">
        {filteredSpareparts.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-outline-variant">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4">search_off</span>
            <h2 className="font-headline-sm text-on-surface mb-2">Sparepart Tidak Ditemukan</h2>
            <p className="text-on-surface-variant font-body-md">Coba gunakan kata kunci lain atau pilih filter lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSpareparts.map((item) => {

              const waText = encodeURIComponent(
                `Halo Pytafix, saya tertarik ingin membeli sparepart:\n\n*Nama Barang:* ${item.name}\n*Harga:* Rp ${item.price.toLocaleString("id-ID")}\n\nApakah stoknya masih tersedia?`
              );
              const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${waText}`;

              return (
                <div key={item.id} className="bg-surface rounded-2xl shadow-sm border border-outline-variant overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                  <Link href={`/sparepart/${item.id}`} className="aspect-[4/3] bg-surface-container-low w-full relative overflow-hidden block">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/50 group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        <span className="material-symbols-outlined text-[48px] mb-2">inventory_2</span>
                        <span className="font-label-sm">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
                      <span className="bg-primary text-on-primary px-3 py-1.5 rounded-full font-label-bold text-xs shadow-md backdrop-blur-sm">
                        {item.category}
                      </span>
                      {item.condition && (
                        <span className="bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full font-label-bold text-xs shadow-md backdrop-blur-sm">
                          {item.condition}
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col relative z-20 bg-surface">
                    <Link href={`/sparepart/${item.id}`}>
                      <h3 className="font-title-lg text-on-surface mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors cursor-pointer">{item.name}</h3>
                    </Link>

                    <div className="mb-4">
                      <span className={`inline-flex items-center gap-1 font-label-bold text-xs px-2 py-1 rounded-md ${item.stock > 0 ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"}`}>
                        <span className="material-symbols-outlined text-[14px]">{item.stock > 0 ? "check_circle" : "cancel"}</span>
                        {item.stock > 0 ? `${item.stock} Tersedia` : "Habis"}
                      </span>
                    </div>

                    <p className="font-body-sm text-on-surface-variant mb-4 line-clamp-2 flex-1">
                      {item.description || "Spesifikasi dan deskripsi detail tidak tersedia."}
                    </p>

                    {/* Marketplace links */}
                    {item.marketplaceLinks.length > 0 && (
                      <div className="flex items-center gap-1.5 mb-3">
                        {item.marketplaceLinks.map((link, i) => {
                          const mp = MARKETPLACES[link.marketplace];
                          if (!mp) return null;
                          return (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Beli di ${mp.label}`}
                              className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                            >
                              <img src={mp.src} alt={mp.label} className="w-5 h-5 object-contain" />
                            </a>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-outline-variant">
                      <p className="font-headline-sm text-primary mb-3">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>

                      {item.stock > 0 ? (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-label-bold text-label-bold transition-all bg-[#25D366] hover:bg-[#1DA851] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                          Pesan Sekarang
                        </a>
                      ) : (
                        <button
                          disabled
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-label-bold text-label-bold transition-all bg-surface-container text-on-surface-variant cursor-not-allowed opacity-70"
                        >
                          <span className="material-symbols-outlined text-[20px]">block</span>
                          Stok Kosong
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

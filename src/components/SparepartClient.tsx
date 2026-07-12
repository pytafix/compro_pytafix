"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface Sparepart {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
}

interface Props {
  initialSpareparts: Sparepart[];
}

export function SparepartClient({ initialSpareparts }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialSpareparts.map(s => s.category));
    return ["Semua", ...Array.from(cats)];
  }, [initialSpareparts]);

  // Filter logic
  const filteredSpareparts = useMemo(() => {
    return initialSpareparts.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialSpareparts, searchQuery, selectedCategory]);

  return (
    <>
      {/* Search and Filter Section */}
      <section className="px-6 -mt-8 relative z-20 max-w-5xl mx-auto mb-12">
        <div className="bg-surface p-4 md:p-6 rounded-2xl shadow-lg border border-outline-variant flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Cari sparepart (Contoh: RAM 8GB, SSD 512GB...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-lg text-on-surface"
            />
          </div>
          <div className="w-full md:w-64 flex-shrink-0">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-lg text-on-surface appearance-none cursor-pointer"
              style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23494c4e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        {filteredSpareparts.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-outline-variant">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4">search_off</span>
            <h2 className="font-headline-sm text-on-surface mb-2">Sparepart Tidak Ditemukan</h2>
            <p className="text-on-surface-variant font-body-md">Coba gunakan kata kunci lain atau pilih kategori Semua.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSpareparts.map((item) => {
              const waText = encodeURIComponent(`Halo Pytafix, saya tertarik ingin membeli sparepart:\n\n*Nama Barang:* ${item.name}\n*Harga:* Rp ${item.price.toLocaleString("id-ID")}\n\nApakah stoknya masih tersedia?`);
              const waLink = `https://wa.me/6281234567890?text=${waText}`;

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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-primary text-on-primary px-3 py-1.5 rounded-full font-label-bold text-xs shadow-md backdrop-blur-sm">
                        {item.category}
                      </span>
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

                    <p className="font-body-sm text-on-surface-variant mb-6 line-clamp-2 flex-1">
                      {item.description || "Spesifikasi dan deskripsi detail tidak tersedia untuk produk ini."}
                    </p>

                    <div className="mt-auto pt-4 border-t border-outline-variant">
                      <p className="font-headline-sm text-primary mb-4">
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

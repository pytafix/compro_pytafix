"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface MarketplaceLink {
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
  marketplaceLinks: MarketplaceLink[];
}

interface Props {
  initialProducts: Product[];
}

const CATEGORIES = ["Semua", "LAPTOP", "HP", "TABLET"];
const CONDITIONS = ["Semua", "BARU", "BEKAS", "REFURBISHED"];
const SORT_OPTIONS = [
  { value: "terbaru", label: "Terbaru" },
  { value: "termurah", label: "Termurah" },
  { value: "termahal", label: "Termahal" },
];

const categoryLabels: Record<string, string> = {
  Semua: "Semua",
  LAPTOP: "Laptop",
  HP: "HP / Smartphone",
  TABLET: "Tablet",
};

const conditionLabels: Record<string, string> = {
  Semua: "Semua",
  BARU: "Baru",
  BEKAS: "Bekas",
  REFURBISHED: "Refurbished",
};

const conditionColors: Record<string, string> = {
  BARU: "bg-primary-container text-on-primary-container",
  BEKAS: "bg-secondary-container text-on-secondary-container",
  REFURBISHED: "bg-tertiary-container text-on-tertiary-container",
};

const marketplaceIcons: Record<string, { src: string; label: string; bg: string }> = {
  SHOPEE: { src: "/images/marketplaces/shopee.svg", label: "Shopee", bg: "bg-[#EE4D2D] hover:bg-[#d43c1f]" },
  TOKOPEDIA: { src: "/images/marketplaces/tokopedia.svg", label: "Tokopedia", bg: "bg-[#03D30F] hover:bg-[#02b30c]" },
  BLIBLI: { src: "/images/marketplaces/blibli.svg", label: "BLIBLI", bg: "bg-[#1A7BB9] hover:bg-[#156695]" },
  LAZADA: { src: "/images/marketplaces/lazada.svg", label: "Lazada", bg: "bg-[#F05A00] hover:bg-[#d14e00]" },
};

function MarketplaceButton({ marketplace, url }: { marketplace: string; url: string }) {
  const icon = marketplaceIcons[marketplace];
  if (!icon) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Beli di ${icon.label}`}
      className={`w-9 h-9 rounded-full flex items-center justify-center overflow-hidden transition-all hover:scale-110 shadow-md flex-shrink-0`}
    >
      <img src={icon.src} alt={icon.label} className="w-5 h-5 object-contain" />
    </a>
  );
}

export default function JualBeliClient({ initialProducts }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedCondition, setSelectedCondition] = useState("Semua");
  const [sortBy, setSortBy] = useState("terbaru");

  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(item => {
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
      case "terbaru":
      default:
        // already desc by createdAt from server
        break;
    }

    return result;
  }, [initialProducts, searchQuery, selectedCategory, selectedCondition, sortBy]);

  return (
    <>
      {/* Search and Filter Section */}
      <section className="px-6 -mt-8 relative z-20 max-w-5xl mx-auto mb-12">
        <div className="bg-surface p-4 md:p-6 rounded-2xl shadow-lg border border-outline-variant flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              type="text"
              placeholder="Cari laptop atau HP (Contoh: MacBook Pro, iPhone 13...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-lg text-on-surface"
            />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-label-bold text-label-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-on-primary shadow-md"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-outline-variant hidden md:block" />

            {/* Condition pills */}
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map(cond => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-4 py-2 rounded-full font-label-bold text-label-sm transition-all ${
                    selectedCondition === cond
                      ? "bg-primary text-on-primary shadow-md"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {conditionLabels[cond]}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="ml-auto">
              <select
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

      {/* Results count */}
      <section className="px-6 max-w-7xl mx-auto mb-4">
        <p className="font-body-sm text-on-surface-variant">
          Menampilkan {filteredProducts.length} dari {initialProducts.length} produk
        </p>
      </section>

      {/* Catalog */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-outline-variant">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4">search_off</span>
            <h2 className="font-headline-sm text-on-surface mb-2">Produk Tidak Ditemukan</h2>
            <p className="text-on-surface-variant font-body-md">Coba gunakan kata kunci atau filter lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((item) => (
              <div key={item.id} className="bg-surface rounded-2xl shadow-sm border border-outline-variant overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                <Link href={`/jual-beli/${item.id}`} className="aspect-[4/3] bg-surface-container-low w-full relative overflow-hidden block">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/50 group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-[48px] mb-2">devices</span>
                      <span className="font-label-sm">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="bg-primary text-on-primary px-3 py-1.5 rounded-full font-label-bold text-xs shadow-md backdrop-blur-sm">
                      {categoryLabels[item.category] || item.category}
                    </span>
                    <span className={`px-3 py-1.5 rounded-full font-label-bold text-xs shadow-md backdrop-blur-sm ${conditionColors[item.condition] || "bg-surface-container-high text-on-surface-variant"}`}>
                      {conditionLabels[item.condition] || item.condition}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col relative z-20 bg-surface">
                  <Link href={`/jual-beli/${item.id}`}>
                    <h3 className="font-title-lg text-on-surface mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors cursor-pointer">{item.name}</h3>
                  </Link>

                  <p className="font-body-sm text-on-surface-variant mb-4 line-clamp-2 flex-1">
                    {item.description || "Tidak ada deskripsi."}
                  </p>

                  <div className="mt-auto">
                    <p className="font-headline-sm text-primary mb-4">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>

                    {/* Marketplace links */}
                    {item.marketplaceLinks.length > 0 ? (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-label-sm text-on-surface-variant text-xs">Beli di:</span>
                        <div className="flex gap-1.5">
                          {item.marketplaceLinks.map((link, i) => (
                            <MarketplaceButton key={i} marketplace={link.marketplace} url={link.url} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3 flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px]">link_off</span>
                        <span>Belum ada link marketplace</span>
                      </div>
                    )}

                    <Link
                      href={`/jual-beli/${item.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-label-bold text-label-bold transition-all bg-primary text-on-primary hover:bg-on-primary-fixed-variant shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

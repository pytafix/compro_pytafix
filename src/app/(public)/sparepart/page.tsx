import Link from "next/link";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Jual Sparepart & Aksesoris Laptop di Malang | Pytafix",
  description: "Beli berbagai macam suku cadang (sparepart) original untuk komputer dan laptop Anda. Tersedia RAM, SSD, baterai, dan lainnya.",
};

export default async function SparepartPage() {
  const spareparts = await prisma.sparepart.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      {/* Header Section */}
      <section className="bg-primary-container text-on-primary-container py-16 px-6 text-center">
        <h1 className="font-display-md text-display-md mb-4 max-w-4xl mx-auto">
          Suku Cadang Berkualitas
        </h1>
        <p className="font-body-lg text-body-lg max-w-2xl mx-auto opacity-90">
          Temukan sparepart original untuk memaksimalkan performa perangkat Anda.
        </p>
      </section>

      {/* Catalog Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {spareparts.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4">inventory_2</span>
            <h2 className="font-headline-sm text-on-surface mb-2">Belum Ada Produk</h2>
            <p className="text-on-surface-variant font-body-md">Katalog sparepart sedang diperbarui. Silakan periksa kembali nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {spareparts.map((item) => {
              const waText = encodeURIComponent(`Halo Pytafix, saya tertarik ingin membeli sparepart:\n\n*Nama Barang:* ${item.name}\n*Harga:* Rp ${item.price.toLocaleString("id-ID")}\n\nApakah stoknya masih tersedia?`);
              const waLink = `https://wa.me/6281234567890?text=${waText}`;

              return (
                <div key={item.id} className="bg-surface rounded-2xl shadow-sm border border-outline-variant overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="aspect-[4/3] bg-surface-container w-full relative group">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/50">
                        <span className="material-symbols-outlined text-[48px]">image</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-surface/90 backdrop-blur text-on-surface px-3 py-1 rounded-full font-label-bold text-label-sm shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 line-clamp-2">{item.name}</h3>
                    
                    <div className="mb-4 flex items-center gap-2">
                      <span className={`font-label-bold text-label-sm ${item.stock > 0 ? "text-primary" : "text-error"}`}>
                        {item.stock > 0 ? `Stok: ${item.stock}` : "Habis"}
                      </span>
                    </div>

                    <p className="font-body-md text-on-surface-variant mb-6 line-clamp-3 flex-1">
                      {item.description || "Tidak ada deskripsi."}
                    </p>

                    <div className="mt-auto">
                      <p className="font-title-lg text-title-lg text-on-surface mb-4">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>

                      {item.stock > 0 ? (
                        <a 
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-label-bold text-label-bold transition-all bg-[#25D366] hover:bg-[#1DA851] text-white shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[20px]">chat</span>
                          Beli via WhatsApp
                        </a>
                      ) : (
                        <button 
                          disabled
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-label-bold text-label-bold transition-all bg-surface-container text-on-surface-variant cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined text-[20px]">chat</span>
                          Stok Habis
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
    </main>
  );
}

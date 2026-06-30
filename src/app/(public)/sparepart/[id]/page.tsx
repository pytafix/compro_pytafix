import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sparepart = await prisma.sparepart.findUnique({
    where: { id: parseInt(id, 10) }
  });

  if (!sparepart) {
    return {
      title: "Sparepart Tidak Ditemukan | Pytafix",
      alternates: { canonical: `/sparepart/${id}` },
    };
  }

  return {
    title: `${sparepart.name} - ${sparepart.category} | Pytafix`,
    description: sparepart.description || `Beli ${sparepart.name} original di Pytafix Malang.`,
    alternates: { canonical: `/sparepart/${id}` },
    openGraph: {
      title: `${sparepart.name} | Pytafix`,
      description: sparepart.description || `Beli ${sparepart.name} original di Pytafix Malang.`,
      url: `https://www.pytafix.web.id/sparepart/${id}`,
      images: [{ url: "/logo.png", width: 800, height: 600, alt: sparepart.name }],
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function SparepartDetailPage({ params }: Props) {
  const { id } = await params;
  const sparepart = await prisma.sparepart.findUnique({
    where: { id: parseInt(id, 10) }
  });

  if (!sparepart) {
    notFound();
  }

  const waText = encodeURIComponent(`Halo Pytafix, saya tertarik ingin membeli sparepart:\n\n*Nama Barang:* ${sparepart.name}\n*Harga:* Rp ${sparepart.price.toLocaleString("id-ID")}\n\nApakah stoknya masih tersedia?`);
  const waLink = `https://wa.me/6281234567890?text=${waText}`;

  return (
    <main className="flex-grow bg-background">
      <section className="bg-surface-container-low py-12 px-4 border-b border-outline-variant">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-on-surface-variant font-label-md">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link href="/sparepart" className="hover:text-primary transition-colors">Sparepart</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface truncate">{sparepart.name}</span>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          
          {/* Image Gallery (Left) */}
          <div className="w-full md:w-1/2">
            <div className="bg-surface-container rounded-2xl aspect-square relative overflow-hidden border border-outline-variant shadow-sm flex items-center justify-center">
               {sparepart.imageUrl ? (
                  <Image src={sparepart.imageUrl} alt={sparepart.name} fill className="object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-[120px] text-on-surface-variant/30">inventory_2</span>
                )}
            </div>
          </div>

          {/* Product Details (Right) */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-4">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-bold text-sm">
                {sparepart.category}
              </span>
            </div>
            
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
              {sparepart.name}
            </h1>
            
            <p className="font-headline-md text-primary mb-6">
              Rp {sparepart.price.toLocaleString("id-ID")}
            </p>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-outline-variant">
               <div className="flex flex-col">
                 <span className="font-label-sm text-on-surface-variant">Status Stok</span>
                 <span className={`inline-flex items-center gap-1 font-label-bold text-sm px-2 py-1 rounded-md mt-1 w-fit ${sparepart.stock > 0 ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"}`}>
                    <span className="material-symbols-outlined text-[16px]">{sparepart.stock > 0 ? "check_circle" : "cancel"}</span>
                    {sparepart.stock > 0 ? `${sparepart.stock} Unit Tersedia` : "Stok Kosong"}
                 </span>
               </div>
               <div className="flex flex-col border-l border-outline-variant pl-4">
                 <span className="font-label-sm text-on-surface-variant">Garansi</span>
                 <span className="font-label-bold text-sm text-on-surface mt-1 flex items-center gap-1">
                   <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                   Garansi Pemasangan
                 </span>
               </div>
            </div>

            <div className="mb-8 flex-grow">
              <h3 className="font-title-md text-on-surface mb-3">Deskripsi Produk</h3>
              <div className="prose prose-sm text-on-surface-variant">
                <p className="whitespace-pre-wrap">
                  {sparepart.description || "Belum ada deskripsi detail untuk produk ini."}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant mb-6">
               <h4 className="font-title-sm text-on-surface mb-2 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">build_circle</span>
                 Layanan Pemasangan Tersedia
               </h4>
               <p className="font-body-sm text-on-surface-variant">
                 Beli sparepart ini sekalian dipasangkan oleh teknisi profesional kami? Jadwalkan servis sekarang dan dapatkan garansi penuh.
               </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
               {sparepart.stock > 0 ? (
                 <a 
                   href={waLink}
                   target="_blank"
                   rel="noreferrer"
                   className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-label-bold text-label-bold transition-all bg-[#25D366] hover:bg-[#1DA851] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                 >
                   <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
                   Beli via WhatsApp
                 </a>
               ) : (
                 <button 
                   disabled
                   className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-label-bold text-label-bold transition-all bg-surface-container text-on-surface-variant cursor-not-allowed opacity-70"
                 >
                   <span className="material-symbols-outlined text-[24px]">block</span>
                   Stok Kosong
                 </button>
               )}
               <Link href="/booking-servis" className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-label-bold text-label-bold border border-primary text-primary hover:bg-primary/5 transition-colors cursor-pointer text-center">
                 Booking Servis
               </Link>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, MARKETPLACES } from "@/lib/config";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { marketplaceLinks: true },
  });
  if (!product) return { title: "Produk Tidak Ditemukan" };

  return {
    title: `${product.name} — Jual Beli di Pytafix`,
    description: product.description || `Beli ${product.name} berkualitas di Pytafix Malang. Kondisi ${product.condition}, harga Rp ${product.price.toLocaleString("id-ID")}.`,
    alternates: { canonical: `/jual-beli/${id}` },
    openGraph: {
      title: `${product.name} | Pytafix`,
      description: product.description || "",
      url: `https://www.pytafix.web.id/jual-beli/${id}`,
      images: product.imageUrl ? [{ url: product.imageUrl, width: 800, height: 600 }] : [],
      type: "website",
    },
  };
}

const conditionLabels: Record<string, string> = {
  BARU: "Baru",
  BEKAS: "Bekas",
  REFURBISHED: "Refurbished",
};

const conditionColors: Record<string, string> = {
  BARU: "bg-primary-container text-on-primary-container",
  BEKAS: "bg-secondary-container text-on-secondary-container",
  REFURBISHED: "bg-tertiary-container text-on-tertiary-container",
};

const categoryLabels: Record<string, string> = {
  LAPTOP: "Laptop",
  HP: "HP / Smartphone",
  TABLET: "Tablet",
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { marketplaceLinks: true },
  });

  if (!product) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://www.pytafix.web.id" },
          { "@type": "ListItem", "position": 2, "name": "Jual Beli", "item": "https://www.pytafix.web.id/jual-beli" },
          { "@type": "ListItem", "position": 3, "name": product.name }
        ]
      },
      {
        "@type": "Product",
        name: product.name,
        description: product.description || "",
        image: product.imageUrl || undefined,
        brand: { "@type": "Brand", "name": "Pytafix" },
        sku: product.id.toString(),
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "IDR",
          availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          seller: { "@id": "https://www.pytafix.web.id/#organization" },
        },
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="min-h-screen bg-surface-container-lowest">
        {/* Breadcrumb */}
        <section className="bg-surface border-b border-outline-variant">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-margin-desktop py-4">
            <nav className="flex items-center gap-2 text-sm font-body-sm text-on-surface-variant">
              <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              <span>/</span>
              <Link href="/jual-beli" className="hover:text-primary transition-colors">Jual Beli</Link>
              <span>/</span>
              <span className="text-on-surface">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-12 px-4 md:px-8 lg:px-margin-desktop max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden border border-outline-variant shadow-sm">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/50">
                  <span className="material-symbols-outlined text-[96px] mb-4">devices</span>
                  <span className="font-label-bold">Tidak Ada Gambar</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-primary text-on-primary px-3 py-1.5 rounded-full font-label-bold text-sm">
                    {categoryLabels[product.category] || product.category}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full font-label-bold text-sm ${conditionColors[product.condition] || ""}`}>
                    {conditionLabels[product.condition] || product.condition}
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">{product.name}</h1>
                <p className="font-headline-lg text-headline-lg text-primary">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>

              {product.description && (
                <div className="bg-surface p-6 rounded-xl border border-outline-variant">
                  <h2 className="font-label-bold text-label-bold text-on-surface mb-3">Deskripsi</h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Stock */}
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-label-bold text-sm ${
                  product.stock > 0 ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"
                }`}>
                  <span className="material-symbols-outlined text-[16px]">
                    {product.stock > 0 ? "check_circle" : "cancel"}
                  </span>
                  {product.stock > 0 ? `${product.stock} unit tersedia` : "Stok habis"}
                </span>
              </div>

              {/* Marketplace CTAs */}
              {product.marketplaceLinks.length > 0 && (
                <div className="bg-surface p-6 rounded-xl border border-outline-variant">
                  <h2 className="font-label-bold text-label-bold text-on-surface mb-4">Beli di Marketplace</h2>
                  <div className="flex flex-wrap gap-3">
                    {product.marketplaceLinks.map((link, i) => {
                      const mp = MARKETPLACES[link.marketplace];
                      return (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-label-bold text-label-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all ${mp ? mp.bg : "bg-primary hover:bg-primary/90"}`}
                        >
                          {mp && <img src={mp.src} alt={mp.label} className="w-5 h-5 object-contain" />}
                          {link.marketplace}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* WA CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                {product.marketplaceLinks.length === 0 && (
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Halo Pytafix, saya tertarik dengan:\n\n*Nama:* ${product.name}\n*Harga:* Rp ${product.price.toLocaleString("id-ID")}\n*Kondisi:* ${conditionLabels[product.condition] || product.condition}\n\nApakah produk ini masih tersedia?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-label-bold text-label-bold bg-[#25D366] hover:bg-[#1DA851] text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Tanya via WhatsApp
                  </a>
                )}
                <Link
                  href="/jual-beli"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-label-bold text-label-bold border border-outline-variant text-on-surface hover:bg-surface-container transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  Kembali ke Katalog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

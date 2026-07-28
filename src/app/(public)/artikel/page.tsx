import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ARTICLE_EDITORIAL_OVERRIDES, isPublicReviewedArticleSlug } from "@/lib/site-content";
import { Metadata } from "next";

const articleMetadata: Metadata = {
  title: "Artikel & Edukasi Servis",
  description: "Kumpulan artikel, tips, dan edukasi seputar perawatan serta perbaikan laptop, komputer, dan HP dari Pytafix Malang.",
  alternates: { canonical: "/artikel" },
  openGraph: {
  title: "Artikel & Edukasi Servis",
    description: "Kumpulan artikel, tips, dan edukasi seputar perawatan serta perbaikan laptop, komputer, dan HP dari Pytafix Malang.",
    url: "https://www.pytafix.web.id/artikel",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Artikel" }],
    locale: "id_ID",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const count = await prisma.article.count({
    where: {
      publishedAt: { lte: new Date() },
      slug: { in: Object.keys(ARTICLE_EDITORIAL_OVERRIDES) },
    },
  });
  return {
    ...articleMetadata,
    robots: count > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export const revalidate = 3600;

export default async function ArtikelPage() {
  const storedArticles = await prisma.article.findMany({
    where: { publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: "desc" },
  });
  const articles = storedArticles.filter((article) => isPublicReviewedArticleSlug(article.slug)).map((article) => ({
    ...article,
    ...ARTICLE_EDITORIAL_OVERRIDES[article.slug],
    author: "Tim Editorial Pytafix",
  }));

  const featured = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-on-surface mb-16">Artikel &amp; Edukasi</h1>

      {articles.length === 0 && (
        <p className="text-center text-on-surface-variant">Belum ada artikel.</p>
      )}

      {/* Featured Article */}
      {featured && (
        <div className="mb-16">
          <Link href={`/artikel/${featured.slug}`} className="group block">
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-6">
              <Image 
                src={featured.imageUrl || "/images/og-banner.png"} 
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Terbaru
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors">
              {featured.title}
            </h2>
            <p className="text-lg text-on-surface-variant mb-4">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-3 text-on-surface-variant text-sm mb-3">
              <span>{featured.author}</span>
              <span>•</span>
              <time dateTime={(featured.publishedAt || featured.createdAt).toISOString()}>
                {new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(featured.publishedAt || featured.createdAt))}
              </time>
            </div>
            <span className="text-primary font-semibold flex items-center">
              Baca Selengkapnya
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>
      )}

      {/* Grid Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularArticles.map((article) => (
          <Link href={`/artikel/${article.slug}`} key={article.id} className="group flex flex-col">
            <div className="relative h-[240px] w-full rounded-2xl overflow-hidden mb-4">
              <Image 
                src={article.imageUrl || "/images/og-banner.png"} 
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold">
                  Artikel
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs mb-3">
              <span>{article.author}</span>
              <span>•</span>
              <time dateTime={(article.publishedAt || article.createdAt).toISOString()}>
                {new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(article.publishedAt || article.createdAt))}
              </time>
            </div>
            <p className="text-on-surface-variant mb-4 line-clamp-3 flex-1">
              {article.excerpt}
            </p>
            <span className="text-primary font-semibold flex items-center mt-auto">
              Baca Selengkapnya
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

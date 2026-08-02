import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { renderStoredContent } from "@/lib/content";
import { serializeJsonLd } from "@/lib/json-ld";
import { ARTICLE_EDITORIAL_OVERRIDES, ARTICLE_REFERENCES, isPublicReviewedArticleSlug, PUBLIC_ARTICLE_AUTHOR } from "@/lib/site-content";

export const revalidate = 3600;

async function getPublishedArticle(slug: string) {
  if (!isPublicReviewedArticleSlug(slug)) return null;
  return prisma.article.findFirst({
    where: { slug, publishedAt: { lte: new Date() } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const storedArticle = await getPublishedArticle(slug);

  if (!storedArticle) {
    return {
      title: "Artikel Tidak Ditemukan",
      robots: { index: false, follow: false },
    };
  }
  const article = { ...storedArticle, ...ARTICLE_EDITORIAL_OVERRIDES[slug], author: PUBLIC_ARTICLE_AUTHOR };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/artikel/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.imageUrl || "/images/og-banner.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      url: `https://www.pytafix.web.id/artikel/${slug}`,
      locale: "id_ID",
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const storedArticle = await getPublishedArticle(slug);

  if (!storedArticle) notFound();
  const article = { ...storedArticle, ...ARTICLE_EDITORIAL_OVERRIDES[slug], author: PUBLIC_ARTICLE_AUTHOR };

  const publishedDate = article.publishedAt;
  if (!publishedDate) notFound();
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(publishedDate);
  const formattedUpdatedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(article.updatedAt);
  const references = ARTICLE_REFERENCES[slug] || [];
  const relatedServiceSlug = slug.includes("hp") ? "service-hp" : "service-laptop";
  const relatedArticles = await prisma.article.findMany({
    where: {
      slug: { in: Object.keys(ARTICLE_EDITORIAL_OVERRIDES).filter((relatedSlug) => relatedSlug !== slug) },
      publishedAt: { lte: new Date() },
    },
    select: { slug: true, title: true },
    take: 2,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [
      new URL(article.imageUrl || "/images/og-banner.png", "https://www.pytafix.web.id").toString(),
    ],
    datePublished: publishedDate.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    inLanguage: "id-ID",
    mainEntityOfPage: `https://www.pytafix.web.id/artikel/${slug}`,
    publisher: { "@id": "https://www.pytafix.web.id/#organization" },
    author: { "@id": "https://www.pytafix.web.id/#organization" },
  };

  return (
    <article className="container mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <header className="mb-8 text-center">
        <h1 className="mb-6 text-4xl font-bold text-on-surface md:text-5xl">{article.title}</h1>
        <div className="flex items-center justify-center gap-4 text-on-surface-variant">
          <span className="font-semibold text-on-surface">{article.author}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={publishedDate.toISOString()}>{formattedDate}</time>
        </div>
        <p className="mt-3 text-sm text-on-surface-variant">Artikel ini menggunakan rujukan resmi yang tercantum. Diperbarui {formattedUpdatedDate}.</p>
      </header>

      <div className="relative mb-12 h-[400px] w-full overflow-hidden rounded-3xl md:h-[500px]">
        <Image
          src={article.imageUrl || "/images/og-banner.png"}
          alt={article.title}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      <div
        className="article-content max-w-none font-body-lg text-body-lg text-on-surface-variant"
        dangerouslySetInnerHTML={{ __html: renderStoredContent(article.content) }}
      />

      <aside className="mt-12 rounded-2xl border border-outline-variant bg-surface-container-low p-6">
        <h2 className="font-headline-md text-headline-md text-on-surface">Catatan penting</h2>
        <p className="mt-3 text-on-surface-variant">
          Artikel ini merupakan panduan umum, bukan diagnosis perangkat. Kondisi, data, biaya,
          dan kelayakan perbaikan baru dapat dipastikan setelah pemeriksaan.
        </p>
        {references.length > 0 && (
          <>
            <h3 className="mt-6 font-label-bold text-on-surface">Rujukan resmi</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {references.map((reference) => (
                <li key={reference.url}>
                  <a
                    className="text-primary underline underline-offset-4"
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {reference.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/layanan" className="text-primary underline underline-offset-4">
            Lihat layanan
          </Link>
          <Link href={`/layanan/${relatedServiceSlug}`} className="text-primary underline underline-offset-4">
            Layanan terkait
          </Link>
          <Link href="/faq" className="text-primary underline underline-offset-4">
            FAQ servis
          </Link>
          <Link href="/kontak" className="text-primary underline underline-offset-4">
            Kontak dan lokasi
          </Link>
          <Link href="/booking-servis" className="text-primary underline underline-offset-4">
            Ajukan pemeriksaan
          </Link>
        </div>
        <div className="mt-6 border-t border-outline-variant pt-5">
          <h3 className="font-label-bold text-on-surface">Baca juga</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {relatedArticles.map((relatedArticle) => (
              <li key={relatedArticle.slug}>
                <Link href={`/artikel/${relatedArticle.slug}`} className="text-primary underline underline-offset-4">
                  {relatedArticle.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </article>
  );
}

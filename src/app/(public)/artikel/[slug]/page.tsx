import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { sanitizeContent } from "@/lib/sanitize";
import { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });

  if (!article) return { title: "Artikel Tidak Ditemukan | Pytafix" };

  return {
    title: `${article.title} | Pytafix Edukasi`,
    description: article.excerpt,
    alternates: { canonical: `/artikel/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.imageUrl || "/images/og-banner.png", width: 1200, height: 630, alt: article.title }],
      url: `https://www.pytafix.web.id/artikel/${slug}`,
      locale: "id_ID",
      type: "article",
    }
  };
}

export default async function ArticleDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug }
  });

  if (!article) {
    notFound();
  }

  const publishedDate = article.publishedAt || article.createdAt;
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(publishedDate));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": [
      `https://www.pytafix.web.id${article.imageUrl || "/logo.png"}`
    ],
    "datePublished": publishedDate.toISOString(),
    "publisher": { "@id": "https://www.pytafix.web.id/#organization" },
    "author": [{
        "@type": "Person",
        "name": article.author,
    }]
  };

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-6">{article.title}</h1>
        <div className="flex items-center justify-center text-on-surface-variant gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-on-surface">{article.author}</span>
          </div>
          <span>•</span>
          <time dateTime={publishedDate.toISOString()}>{formattedDate}</time>
        </div>
      </div>

      <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden mb-12">
        <Image 
          src={article.imageUrl || "/images/og-banner.png"} 
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <div 
        className="font-body-lg text-body-lg text-on-surface-variant max-w-none whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: sanitizeContent(article.content) }}
      />
    </article>
  );
}

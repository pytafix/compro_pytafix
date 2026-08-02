import prisma from "@/lib/prisma";
import { CONTACT, SITE_DESCRIPTION, SITE_URL } from "@/lib/config";
import { isLocationServiceSlug } from "@/lib/locations";
import { ARTICLE_EDITORIAL_OVERRIDES, ARTICLE_REFERENCES, PUBLIC_ARTICLE_AUTHOR, PUBLIC_SERVICE_COPY, getPublicFaqs, getPublicServiceCopy, isPublicReviewedArticleSlug, isPublicReviewedServiceSlug } from "@/lib/site-content";

export const runtime = "nodejs";
export const revalidate = 3600;

function stripMarkup(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_>`~[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type PromoSummary = {
  slug: string;
  title: string;
  description: string;
  badge: string;
  validUntil: Date;
  terms: string;
};
type ServiceSummary = { slug: string; title: string; description: string; content: string | null };
type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date | null;
  updatedAt: Date | null;
};

export async function GET() {
  const now = new Date();
  let promos: PromoSummary[] = [];
  let services: ServiceSummary[] = [];
  let articles: ArticleSummary[] = [];
  try {
    [promos, services, articles] = await Promise.all([
      prisma.promo.findMany({
        where: { isActive: true, validUntil: { gte: now } },
        select: { slug: true, title: true, description: true, badge: true, validUntil: true, terms: true },
      }),
      prisma.serviceContent.findMany({
        where: { isActive: true },
        select: { slug: true, title: true, description: true, content: true },
      }),
      prisma.article.findMany({
        where: { publishedAt: { lte: now } },
        orderBy: { publishedAt: "desc" },
        select: { slug: true, title: true, excerpt: true, content: true, author: true, publishedAt: true, updatedAt: true },
      }),
    ]);
  } catch (error) {
    console.error("llms.txt dynamic data unavailable; serving reviewed static baseline", error);
  }
  const coreServices = (services.length > 0 ? services : Object.entries(PUBLIC_SERVICE_COPY).map(([slug, copy]) => ({
    slug,
    title: copy.title || slug,
    description: copy.description,
    content: copy.content,
  })))
    .filter((service) => !isLocationServiceSlug(service.slug) && isPublicReviewedServiceSlug(service.slug))
    .map(getPublicServiceCopy);
  const liveEditorialArticles = articles.filter((article) => isPublicReviewedArticleSlug(article.slug)).map((article) => ({
    ...article,
    ...ARTICLE_EDITORIAL_OVERRIDES[article.slug],
    author: PUBLIC_ARTICLE_AUTHOR,
  }));
  const editorialArticles: ArticleSummary[] = liveEditorialArticles.length > 0
    ? liveEditorialArticles
    : Object.entries(ARTICLE_EDITORIAL_OVERRIDES).map(([slug, article]) => ({
        slug,
        ...article,
        author: PUBLIC_ARTICLE_AUTHOR,
        publishedAt: null,
        updatedAt: null,
      }));

  const lines: string[] = [
    "# Pytafix — Servis Laptop, HP, dan Komputer di Malang",
    "",
    "## Tentang Pytafix",
    SITE_DESCRIPTION,
    "Pengerjaan dimulai setelah pemeriksaan awal dan persetujuan ruang lingkup serta estimasi biaya.",
    "Pelanggan dapat memantau tahap perbaikan menggunakan ID servis dan nomor WhatsApp yang digunakan saat booking.",
    "",
    "## Informasi kontak",
    `Alamat layanan: ${CONTACT.address}`,
    `Google Maps: ${CONTACT.mapsUrl}`,
    `Catatan kunjungan: ${CONTACT.visitNote}`,
    `Area layanan: ${CONTACT.serviceArea}`,
    `Telepon/WhatsApp: ${CONTACT.whatsappDisplay}`,
    `Email: ${CONTACT.email}`,
    `Jam operasional: ${CONTACT.hours.days}, ${CONTACT.hours.opens}–${CONTACT.hours.closes}; Sabtu ${CONTACT.hours.saturday}; Minggu ${CONTACT.hours.sunday}.`,
    `Catatan: ${CONTACT.hours.note}`,
    "",
    "## Layanan",
  ];

  for (const service of coreServices) {
    lines.push(`### ${service.title}`);
    lines.push(service.description);
    if (service.content) lines.push(stripMarkup(service.content).slice(0, 900));
    lines.push(`URL: ${SITE_URL}/layanan/${service.slug}`);
    lines.push("");
  }

  lines.push("## Pertanyaan umum");
  for (const faq of getPublicFaqs()) {
    lines.push(`Q: ${faq.question}`);
    lines.push(`A: ${faq.answer}`);
  }
  lines.push("");

  if (promos.length > 0) {
    lines.push("## Promo aktif");
    for (const promo of promos) {
      lines.push(`### ${promo.title} (${promo.badge})`);
      lines.push(promo.description);
      lines.push(
        `Berlaku hingga: ${new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(promo.validUntil)}`
      );
      lines.push(`Syarat: ${stripMarkup(promo.terms)}`);
      lines.push(`URL: ${SITE_URL}/promo/${promo.slug}`);
      lines.push("");
    }
  }

  lines.push("## Artikel dan edukasi");
  for (const article of editorialArticles) {
    lines.push(`### ${article.title}`);
    const publicationDate = article.publishedAt
      ? new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(article.publishedAt)
      : "tanggal publikasi belum tersedia";
    lines.push(`Penulis: ${article.author || PUBLIC_ARTICLE_AUTHOR} | ${publicationDate}`);
    lines.push(article.excerpt);
    const preview = stripMarkup(article.content).slice(0, 500);
    lines.push(preview + (stripMarkup(article.content).length > 500 ? "…" : ""));
    if (article.updatedAt) {
      lines.push(`Diperbarui: ${new Intl.DateTimeFormat("id-ID", { year: "numeric", month: "long", day: "numeric" }).format(article.updatedAt)}`);
    }
    for (const reference of ARTICLE_REFERENCES[article.slug] || []) {
      lines.push(`Rujukan: ${reference.label} — ${reference.url}`);
    }
    lines.push(`URL: ${SITE_URL}/artikel/${article.slug}`);
    lines.push("");
  }

  lines.push("---");
  lines.push(`Sumber kanonis: ${SITE_URL}`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

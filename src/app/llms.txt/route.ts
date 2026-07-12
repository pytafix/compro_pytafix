import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const revalidate = 3600;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function GET() {
  const baseUrl = "https://www.pytafix.web.id";

  const [promos, services, articles] = await Promise.all([
    prisma.promo.findMany({ where: { isActive: true }, select: { title: true, description: true, badge: true, validUntil: true, terms: true } }),
    prisma.serviceContent.findMany({ where: { isActive: true }, select: { title: true, description: true } }),
    prisma.article.findMany({ select: { title: true, excerpt: true, content: true, author: true, publishedAt: true } }),
  ]);

  const lines: string[] = [
    `# Pytafix — Pusat Servis Laptop, HP & Komputer di Malang`,
    ``,
    `## Tentang Pytafix`,
    `Pytafix adalah pusat perbaikan elektronik terpercaya di Malang, Jawa Timur.`,
    `Melayani servis laptop, smartphone, dan komputer dengan teknisi bersertifikat,`,
    `pengerjaan cepat, dan jaminan keamanan data 100%. Servis jujur tanpa biaya tersembunyi.`,
    ``,
    `## Informasi Kontak`,
    `Alamat: Jl. Elektronik No. 123, Kec. Lowokwaru, Malang Raya, Jawa Timur 65141`,
    `Telepon/WhatsApp: +62 812-3456-7890`,
    `Jam Operasional: Senin - Sabtu 09:00 - 18:00 (Minggu Tutup)`,
    ``,
    `## Layanan`,
  ];

  for (const s of services) {
    lines.push(`### ${s.title}`);
    lines.push(s.description);
    lines.push(``);
  }

  lines.push(`## Promo Aktif`);
  for (const p of promos) {
    lines.push(`### ${p.title} (${p.badge})`);
    lines.push(p.description);
    lines.push(`Berlaku hingga: ${p.validUntil}`);
    lines.push(`Syarat: ${stripHtml(p.terms)}`);
    lines.push(``);
  }

  lines.push(`## Artikel & Edukasi`);
  for (const a of articles) {
    const date = a.publishedAt
      ? new Intl.DateTimeFormat("id-ID", { year: "numeric", month: "long", day: "numeric" }).format(new Date(a.publishedAt))
      : "Tidak dipublikasikan";
    lines.push(`### ${a.title}`);
    lines.push(`Penulis: ${a.author} | ${date}`);
    lines.push(a.excerpt);
    const plainContent = stripHtml(a.content).slice(0, 500);
    lines.push(plainContent + (a.content.length > 500 ? "..." : ""));
    lines.push(``);
  }

  lines.push(`---`);
  lines.push(`Source: ${baseUrl}`);
  lines.push(`Generated: ${new Date().toISOString()}`);

  const content = lines.join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

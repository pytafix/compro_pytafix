import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
        <div className="flex items-center justify-center text-muted-foreground gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{article.author}</span>
          </div>
          <span>•</span>
          <time dateTime={publishedDate.toISOString()}>{formattedDate}</time>
        </div>
      </div>

      <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden mb-12">
        <Image 
          src={article.imageUrl || "/images/placeholder.jpg"} 
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}

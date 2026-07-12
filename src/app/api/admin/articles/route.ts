import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, excerpt, content, imageUrl, author, publishedAt } = body;

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        imageUrl,
        author,
        publishedAt: publishedAt ? new Date(publishedAt) : null
      }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/artikel', 'layout');
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

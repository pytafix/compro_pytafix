import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);
    const body = await request.json();
    const { slug, title, excerpt, content, imageUrl, author, publishedAt } = body;
    
    const article = await prisma.article.update({
      where: { id },
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
    
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);
    
    await prisma.article.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { articleSchema } from '@/lib/validations';
import { requireAdmin } from '@/lib/admin-auth';
import { cleanupManagedBlobs } from '@/lib/media-cleanup';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const { id } = await params;
    const body = await request.json();
    const data = articleSchema.partial().parse(body);
    const existing = await prisma.article.findUnique({
      where: { id },
      select: { imageUrl: true, slug: true },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        imageUrl: data.imageUrl,
        author: data.author,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      }
    });

    if (data.imageUrl !== undefined && data.imageUrl !== existing.imageUrl) {
      await cleanupManagedBlobs([existing.imageUrl]);
    }

    revalidatePath('/');
    revalidatePath('/artikel');
    revalidatePath(`/artikel/${existing.slug}`);
    revalidatePath(`/artikel/${article.slug}`);
    return NextResponse.json(article);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const { id } = await params;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    await prisma.article.delete({ where: { id } });
    await cleanupManagedBlobs([existing.imageUrl]);

    revalidatePath('/');
    revalidatePath('/artikel');
    revalidatePath(`/artikel/${existing.slug}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { serviceContentSchema } from '@/lib/validations';
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
    const data = serviceContentSchema.partial().parse(body);
    const existing = await prisma.serviceContent.findUnique({
      where: { id },
      select: { imageUrl: true, slug: true },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const service = await prisma.serviceContent.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        content: data.content,
        icon: data.icon,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
      }
    });

    if (data.imageUrl !== undefined && data.imageUrl !== existing.imageUrl) {
      await cleanupManagedBlobs([existing.imageUrl]);
    }

    revalidatePath('/');
    revalidatePath('/layanan');
    revalidatePath(`/layanan/${existing.slug}`);
    revalidatePath(`/layanan/${service.slug}`);
    return NextResponse.json(service);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
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

    const existing = await prisma.serviceContent.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    await prisma.serviceContent.delete({ where: { id } });
    await cleanupManagedBlobs([existing.imageUrl]);

    revalidatePath('/');
    revalidatePath('/layanan');
    revalidatePath(`/layanan/${existing.slug}`);
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}

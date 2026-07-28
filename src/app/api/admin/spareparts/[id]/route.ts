import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { sparepartSchema } from '@/lib/validations';
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
    const data = sparepartSchema.partial().parse(body);
    const existing = await prisma.sparepart.findUnique({
      where: { id },
      select: { imageUrl: true },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Sparepart not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {
      name: data.name,
      category: data.category,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl,
      isFeatured: data.isFeatured,
      condition: data.condition,
    };

    if (data.marketplaceLinks !== undefined) {
      updateData.marketplaceLinks = {
        deleteMany: {},
        create: data.marketplaceLinks.map((link) => ({
          marketplace: link.marketplace,
          url: link.url,
        })),
      };
    }

    const sparepart = await prisma.sparepart.update({
      where: { id },
      data: updateData,
      include: { marketplaceLinks: true },
    });

    if (data.imageUrl !== undefined && data.imageUrl !== existing.imageUrl) {
      await cleanupManagedBlobs([existing.imageUrl]);
    }

    revalidatePath('/');
    revalidatePath('/sparepart');
    revalidatePath(`/sparepart/${id}`);
    return NextResponse.json(sparepart);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update sparepart' }, { status: 500 });
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
    const existing = await prisma.sparepart.findUnique({
      where: { id },
      select: { id: true, imageUrl: true, _count: { select: { usages: true } } },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Sparepart not found' }, { status: 404 });
    }
    if (existing._count.usages > 0) {
      return NextResponse.json(
        { error: 'Sparepart yang sudah tercatat pada riwayat servis tidak dapat dihapus' },
        { status: 409 }
      );
    }

    await prisma.sparepart.delete({
      where: { id }
    });
    await cleanupManagedBlobs([existing.imageUrl]);

    revalidatePath('/');
    revalidatePath('/sparepart');
    revalidatePath(`/sparepart/${id}`);
    return NextResponse.json({ message: 'Sparepart deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sparepart' }, { status: 500 });
  }
}

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { productSchema } from '@/lib/validations';
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
    const data = productSchema.partial().parse(body);
    const existing = await prisma.product.findUnique({
      where: { id },
      select: { imageUrl: true },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {
      name: data.name,
      category: data.category,
      condition: data.condition,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl,
      isFeatured: data.isFeatured,
      isActive: data.isActive,
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

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { marketplaceLinks: true },
    });

    if (data.imageUrl !== undefined && data.imageUrl !== existing.imageUrl) {
      await cleanupManagedBlobs([existing.imageUrl]);
    }

    revalidatePath('/');
    revalidatePath('/jual-beli');
    revalidatePath(`/jual-beli/${id}`);
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
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

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });
    await cleanupManagedBlobs([existing.imageUrl]);

    revalidatePath('/');
    revalidatePath('/jual-beli');
    revalidatePath(`/jual-beli/${id}`);
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

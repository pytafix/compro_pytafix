import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { productSchema } from '@/lib/validations';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = productSchema.partial().parse(body);

    // Delete existing marketplace links and recreate
    if (data.marketplaceLinks !== undefined) {
      await prisma.marketplaceLink.deleteMany({ where: { productId: id } });
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
      updateData.marketplaceLinks = data.marketplaceLinks.length > 0 ? {
        create: data.marketplaceLinks.map((link) => ({
          marketplace: link.marketplace,
          url: link.url,
        })),
      } : { create: [] };
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { marketplaceLinks: true },
    });

    revalidatePath('/');
    revalidatePath('/jual-beli');
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
  try {
    const { id } = await params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/jual-beli');
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

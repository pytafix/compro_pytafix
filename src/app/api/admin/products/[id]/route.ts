import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, category, condition, description, price, stock, imageUrl, isFeatured, isActive, marketplaceLinks } = body;

    // Delete existing marketplace links and recreate
    if (marketplaceLinks !== undefined) {
      await prisma.marketplaceLink.deleteMany({ where: { productId: id } });
    }

    const updateData: Record<string, unknown> = {
      name,
      category,
      condition,
      description,
      price: price !== undefined ? Number(price) : undefined,
      stock: stock !== undefined ? Number(stock) : undefined,
      imageUrl,
      isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
      isActive: isActive !== undefined ? Boolean(isActive) : undefined,
    };

    if (marketplaceLinks !== undefined) {
      updateData.marketplaceLinks = marketplaceLinks.length > 0 ? {
        create: marketplaceLinks.map((link: { marketplace: string; url: string }) => ({
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

    revalidatePath('/', 'layout');
    revalidatePath('/jual-beli', 'layout');
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({ where: { id } });

    revalidatePath('/', 'layout');
    revalidatePath('/jual-beli', 'layout');
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

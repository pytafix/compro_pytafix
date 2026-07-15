import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { sparepartSchema } from '@/lib/validations';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = sparepartSchema.partial().parse(body);

    if (data.marketplaceLinks !== undefined) {
      await prisma.marketplaceLink.deleteMany({ where: { sparepartId: id } });
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
      updateData.marketplaceLinks = data.marketplaceLinks.length > 0 ? {
        create: data.marketplaceLinks.map((link) => ({
          marketplace: link.marketplace,
          url: link.url,
        })),
      } : { create: [] };
    }

    const sparepart = await prisma.sparepart.update({
      where: { id },
      data: updateData,
      include: { marketplaceLinks: true },
    });

    revalidatePath('/');
    revalidatePath('/sparepart');
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
  try {
    const { id } = await params;

    await prisma.sparepart.delete({
      where: { id }
    });

    revalidatePath('/');
    revalidatePath('/sparepart');
    return NextResponse.json({ message: 'Sparepart deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sparepart' }, { status: 500 });
  }
}

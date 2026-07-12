import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = paramId;
    const body = await request.json();
    const { name, category, description, price, stock, imageUrl, isFeatured } = body;

    const sparepart = await prisma.sparepart.update({
      where: { id },
      data: {
        name,
        category,
        description,
        price: price !== undefined ? Number(price) : undefined,
        stock: stock !== undefined ? Number(stock) : undefined,
        imageUrl,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
      }
    });

        revalidatePath('/', 'layout');
    revalidatePath('/sparepart', 'layout');
    return NextResponse.json(sparepart);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update sparepart' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = paramId;

    await prisma.sparepart.delete({
      where: { id }
    });

        revalidatePath('/', 'layout');
    revalidatePath('/sparepart', 'layout');
    return NextResponse.json({ message: 'Sparepart deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sparepart' }, { status: 500 });
  }
}

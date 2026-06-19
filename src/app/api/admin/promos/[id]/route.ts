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
    const { slug, badge, title, description, validUntil, terms, howToClaim, isActive } = body;

    const promo = await prisma.promo.update({
      where: { id },
      data: {
        slug,
        badge,
        title,
        description,
        validUntil,
        terms,
        howToClaim,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
      }
    });

    return NextResponse.json(promo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update promo' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);

    await prisma.promo.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Promo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete promo' }, { status: 500 });
  }
}

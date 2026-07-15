import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { promoSchema } from '@/lib/validations';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = promoSchema.partial().parse(body);

    const validUntil = data.validUntil instanceof Date ? data.validUntil : data.validUntil ? new Date(data.validUntil) : undefined;

    const promo = await prisma.promo.update({
      where: { id },
      data: {
        slug: data.slug,
        badge: data.badge,
        title: data.title,
        description: data.description,
        validUntil,
        terms: data.terms,
        howToClaim: data.howToClaim,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
      }
    });

    revalidatePath('/');
    revalidatePath('/promo');
    return NextResponse.json(promo);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update promo' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.promo.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Promo not found' }, { status: 404 });
    }

    await prisma.promo.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/promo');
    return NextResponse.json({ message: 'Promo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete promo' }, { status: 500 });
  }
}

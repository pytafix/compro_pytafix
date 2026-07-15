import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { promoSchema } from '@/lib/validations';

export async function GET() {
  try {
    const promos = await prisma.promo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(promos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = promoSchema.parse(body);

    const validUntil = data.validUntil instanceof Date ? data.validUntil : new Date(data.validUntil);

    const promo = await prisma.promo.create({
      data: {
        slug: data.slug,
        badge: data.badge,
        title: data.title,
        description: data.description,
        validUntil,
        terms: data.terms,
        howToClaim: data.howToClaim,
        isActive: data.isActive ?? true,
        isFeatured: data.isFeatured ?? false
      }
    });

    revalidatePath('/');
    revalidatePath('/promo');
    return NextResponse.json(promo, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create promo' }, { status: 500 });
  }
}

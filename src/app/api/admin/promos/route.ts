import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const promos = await prisma.promo.findMany({
      orderBy: { id: 'desc' }
    });
        revalidatePath('/', 'layout');
    revalidatePath('/promo', 'layout');
    return NextResponse.json(promos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, badge, title, description, validUntil, terms, howToClaim, isActive, isFeatured } = body;
    
    const promo = await prisma.promo.create({
      data: {
        slug,
        badge,
        title,
        description,
        validUntil,
        terms,
        howToClaim,
        isActive: isActive ?? true,
        isFeatured: isFeatured ?? false
      }
    });
    
        revalidatePath('/', 'layout');
    revalidatePath('/promo', 'layout');
    return NextResponse.json(promo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promo' }, { status: 500 });
  }
}

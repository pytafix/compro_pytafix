import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const promos = await prisma.promo.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(promos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, badge, title, description, validUntil, terms, howToClaim, isActive } = body;
    
    const promo = await prisma.promo.create({
      data: {
        slug,
        badge,
        title,
        description,
        validUntil,
        terms,
        howToClaim,
        isActive: isActive ?? true
      }
    });
    
    return NextResponse.json(promo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promo' }, { status: 500 });
  }
}

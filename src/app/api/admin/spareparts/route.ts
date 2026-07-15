import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { sparepartSchema } from '@/lib/validations';

export async function GET() {
  try {
    const spareparts = await prisma.sparepart.findMany({
      include: { marketplaceLinks: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(spareparts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch spareparts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = sparepartSchema.parse(body);

    const sparepart = await prisma.sparepart.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description ?? null,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl ?? null,
        isFeatured: data.isFeatured ?? false,
        condition: data.condition ?? null,
        marketplaceLinks: data.marketplaceLinks && data.marketplaceLinks.length > 0 ? {
          create: data.marketplaceLinks.map((link) => ({
            marketplace: link.marketplace,
            url: link.url,
          })),
        } : undefined,
      },
      include: { marketplaceLinks: true },
    });

    revalidatePath('/');
    revalidatePath('/sparepart');
    return NextResponse.json(sparepart, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create sparepart' }, { status: 500 });
  }
}

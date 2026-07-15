import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { productSchema } from '@/lib/validations';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { marketplaceLinks: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = productSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        category: data.category,
        condition: data.condition,
        description: data.description ?? null,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl ?? null,
        isFeatured: data.isFeatured ?? false,
        isActive: data.isActive ?? true,
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
    revalidatePath('/jual-beli');
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

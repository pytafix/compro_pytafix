import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
    const { name, category, condition, description, price, stock, imageUrl, isFeatured, isActive, marketplaceLinks } = body;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        condition,
        description,
        price: price !== undefined ? Number(price) : 0,
        stock: stock !== undefined ? Number(stock) : 1,
        imageUrl,
        isFeatured: isFeatured ?? false,
        isActive: isActive ?? true,
        marketplaceLinks: marketplaceLinks && marketplaceLinks.length > 0 ? {
          create: marketplaceLinks.map((link: { marketplace: string; url: string }) => ({
            marketplace: link.marketplace,
            url: link.url,
          })),
        } : undefined,
      },
      include: { marketplaceLinks: true },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/jual-beli', 'layout');
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

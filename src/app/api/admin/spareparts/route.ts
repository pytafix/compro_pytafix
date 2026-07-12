import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const spareparts = await prisma.sparepart.findMany({
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
    const { name, category, description, price, stock, imageUrl, isFeatured } = body;

    const sparepart = await prisma.sparepart.create({
      data: {
        name,
        category,
        description,
        price: price !== undefined ? Number(price) : 0,
        stock: stock !== undefined ? Number(stock) : 0,
        imageUrl,
        isFeatured: isFeatured ?? false
      }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/sparepart', 'layout');
    return NextResponse.json(sparepart, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sparepart' }, { status: 500 });
  }
}

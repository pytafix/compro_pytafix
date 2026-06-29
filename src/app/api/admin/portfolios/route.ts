import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { id: 'desc' }
    });
        revalidatePath('/portofolio', 'layout');
    return NextResponse.json(portfolios);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, deviceType, problemType, beforeImage, afterImage, completionDate } = body;
    
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        deviceType,
        problemType,
        beforeImage,
        afterImage,
        completionDate: completionDate ? new Date(completionDate) : null
      }
    });
    
        revalidatePath('/portofolio', 'layout');
    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}

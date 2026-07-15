import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { portfolioSchema } from '@/lib/validations';

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(portfolios);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = portfolioSchema.parse(body);

    const portfolio = await prisma.portfolio.create({
      data: {
        title: data.title,
        description: data.description,
        deviceType: data.deviceType,
        problemType: data.problemType,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        completionDate: data.completionDate ? new Date(data.completionDate) : null
      }
    });

    revalidatePath('/');
    revalidatePath('/portofolio');
    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}

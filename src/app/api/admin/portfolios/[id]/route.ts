import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { portfolioSchema } from '@/lib/validations';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = portfolioSchema.partial().parse(body);

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        deviceType: data.deviceType,
        problemType: data.problemType,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        completionDate: data.completionDate ? new Date(data.completionDate) : undefined,
      }
    });

    revalidatePath('/');
    revalidatePath('/portofolio');
    return NextResponse.json(portfolio);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.portfolio.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    await prisma.portfolio.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/portofolio');
    return NextResponse.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
  }
}

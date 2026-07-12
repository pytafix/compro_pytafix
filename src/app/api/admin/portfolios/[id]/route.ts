import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, deviceType, problemType, beforeImage, afterImage, completionDate } = body;

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        deviceType,
        problemType,
        beforeImage,
        afterImage,
        completionDate: completionDate ? new Date(completionDate) : null,
      }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/portofolio', 'layout');
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.portfolio.delete({
      where: { id }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/portofolio', 'layout');
    return NextResponse.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
  }
}

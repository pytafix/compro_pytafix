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
    const { question, answer, isActive } = body;

    const faq = await prisma.faq.update({
      where: { id },
      data: {
        question,
        answer,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
      }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/faq', 'layout');
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update faq' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.faq.delete({
      where: { id }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/faq', 'layout');
    return NextResponse.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete faq' }, { status: 500 });
  }
}

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
    const { slug, title, description, content, icon, imageUrl, isActive } = body;

    const service = await prisma.serviceContent.update({
      where: { id },
      data: {
        slug,
        title,
        description,
        content,
        icon,
        imageUrl,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
      }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/layanan', 'layout');
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.serviceContent.delete({
      where: { id }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/layanan', 'layout');
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}

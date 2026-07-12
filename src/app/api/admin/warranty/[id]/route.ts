import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const claim = await prisma.warrantyClaim.update({
      where: { id },
      data: {
        status: data.status,
      },
    });

    return NextResponse.json(claim);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update warranty claim' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.warrantyClaim.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete warranty claim' }, { status: 500 });
  }
}

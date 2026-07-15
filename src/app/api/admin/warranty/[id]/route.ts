import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const warrantyPatchSchema = z.object({
  status: z.enum(['MENUNGGU', 'DIPROSES', 'SELESAI', 'DITOLAK']),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = warrantyPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const claim = await prisma.warrantyClaim.update({
      where: { id },
      data: {
        status: result.data.status,
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

    const existing = await prisma.warrantyClaim.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Warranty claim not found' }, { status: 404 });
    }

    await prisma.warrantyClaim.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete warranty claim' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { canTransitionWarrantyStatus } from '@/lib/warranty';

const warrantyPatchSchema = z.object({
  status: z.enum(['MENUNGGU', 'DIPROSES', 'SELESAI', 'DITOLAK']),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const { id } = await params;
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const result = warrantyPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const existing = await prisma.warrantyClaim.findUnique({
      where: { id },
      select: { status: true },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Warranty claim not found' }, { status: 404 });
    }
    if (!canTransitionWarrantyStatus(existing.status, result.data.status)) {
      return NextResponse.json(
        { error: `Perubahan status ${existing.status} ke ${result.data.status} tidak diizinkan.` },
        { status: 409 }
      );
    }

    const update = await prisma.warrantyClaim.updateMany({
      where: { id, status: existing.status },
      data: { status: result.data.status },
    });
    if (update.count !== 1) {
      return NextResponse.json(
        { error: 'Status klaim berubah saat diperbarui. Muat ulang data.' },
        { status: 409 }
      );
    }
    const claim = await prisma.warrantyClaim.findUnique({
      where: { id },
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
  const auth = await requireAdmin(request);
  if (auth) return auth;
  await params;
  return NextResponse.json(
    { error: 'Riwayat klaim garansi tidak dapat dihapus.' },
    { status: 405, headers: { Allow: 'GET, PATCH' } }
  );
}

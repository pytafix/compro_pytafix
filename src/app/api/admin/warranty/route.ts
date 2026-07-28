import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

const warrantyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(100000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
  query: z.string().trim().max(100).default(''),
  status: z.enum(['ALL', 'MENUNGGU', 'DIPROSES', 'SELESAI', 'DITOLAK']).default('ALL'),
});

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (auth) return auth;

  const url = new URL(request.url);
  const parsed = warrantyQuerySchema.safeParse({
    page: url.searchParams.get('page') || undefined,
    pageSize: url.searchParams.get('pageSize') || undefined,
    query: url.searchParams.get('query') || undefined,
    status: url.searchParams.get('status') || undefined,
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Parameter tidak valid', details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { page, pageSize, query, status } = parsed.data;
  const where: Prisma.WarrantyClaimWhereInput = {
    ...(status !== 'ALL' ? { status } : {}),
    ...(query
      ? {
          OR: [
            { trackingId: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } },
            { whatsapp: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  try {
    const [items, total] = await prisma.$transaction([
      prisma.warrantyClaim.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.warrantyClaim.count({ where }),
    ]);
    return NextResponse.json({
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch warranty claims' }, { status: 500 });
  }
}

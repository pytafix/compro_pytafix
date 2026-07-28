import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { z, ZodError } from 'zod';
import { serviceRequestAdminSchema } from '@/lib/validations';
import { generateUniqueTrackingId } from '@/lib/tracking';
import { requireAdmin } from '@/lib/admin-auth';

const requestQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(100000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
  query: z.string().trim().max(100).default(''),
  status: z.enum([
    'ALL',
    'DITERIMA',
    'DIAGNOSA',
    'DIKERJAKAN',
    'MENUNGGU_SPAREPART',
    'SELESAI',
    'DIBATALKAN',
  ]).default('ALL'),
});

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (auth) return auth;

  const url = new URL(request.url);
  const parsed = requestQuerySchema.safeParse({
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
  const where: Prisma.ServiceRequestWhereInput = {
    ...(status !== 'ALL' ? { status } : {}),
    ...(query
      ? {
          OR: [
            { trackingId: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } },
            { whatsapp: { contains: query, mode: 'insensitive' } },
            { deviceType: { contains: query, mode: 'insensitive' } },
            { problemDesc: { contains: query, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  try {
    const [items, total] = await prisma.$transaction([
      prisma.serviceRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.serviceRequest.count({ where }),
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const body = await request.json();
    const data = serviceRequestAdminSchema.parse(body);

    const trackingId = await generateUniqueTrackingId();

    const newRequest = await prisma.serviceRequest.create({
      data: {
        trackingId,
        name: data.name,
        whatsapp: data.whatsapp,
        address: data.address || '',
        deviceType: data.deviceType,
        serviceType: data.serviceType || '',
        problemDesc: data.problemDesc,
        scheduleDate: data.scheduleDate ? new Date(data.scheduleDate) : new Date(),
        status: data.status || 'DITERIMA',
        technicianName: data.technicianName || null,
        technicianNotes: data.technicianNotes || null,
      },
    });

    revalidatePath('/admin/requests');
    revalidatePath('/cek-status-servis');

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

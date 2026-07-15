import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { serviceRequestAdminSchema } from '@/lib/validations';
import { generateUniqueTrackingId } from '@/lib/tracking';

export async function GET() {
  try {
    const requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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

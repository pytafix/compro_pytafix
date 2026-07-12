import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

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

    const trackingId = 'PYT' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const newRequest = await prisma.serviceRequest.create({
      data: {
        trackingId,
        name: body.name,
        whatsapp: body.whatsapp,
        address: body.address || '',
        deviceType: body.deviceType,
        serviceType: body.serviceType || '',
        problemDesc: body.problemDesc,
        scheduleDate: body.scheduleDate ? new Date(body.scheduleDate) : new Date(),
        status: body.status || 'DITERIMA',
        technicianName: body.technicianName || null,
        technicianNotes: body.technicianNotes || null,
      },
    });

    revalidatePath('/admin/requests', 'layout');
    revalidatePath('/cek-status-servis', 'layout');

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

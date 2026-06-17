import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, whatsapp, address, deviceType, serviceType, problemDesc, date } = body;

    // Generate tracking ID: PYT-2024-XXXX
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    const trackingId = `PYT-2024-${randomChars}`;

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        trackingId,
        name,
        whatsapp,
        address,
        deviceType,
        serviceType,
        problemDesc,
        scheduleDate: new Date(date),
      },
    });

    return NextResponse.json({ trackingId: serviceRequest.trackingId }, { status: 200 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

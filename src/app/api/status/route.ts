import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trackingId = searchParams.get('trackingId');

    if (!trackingId) {
      return NextResponse.json({ error: 'trackingId is required' }, { status: 400 });
    }

    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: {
        trackingId,
      },
    });

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(serviceRequest, { status: 200 });
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}

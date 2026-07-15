import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { statusRateLimit } from '@/lib/rate-limit';

export async function GET(req: Request) {
  const rateLimitResponse = await statusRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

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

    // Return only public-safe fields — never expose personal data without auth
    return NextResponse.json({
      trackingId: serviceRequest.trackingId,
      status: serviceRequest.status,
      deviceType: serviceRequest.deviceType,
      serviceType: serviceRequest.serviceType,
      createdAt: serviceRequest.createdAt,
      diagnosedAt: serviceRequest.diagnosedAt,
      workingAt: serviceRequest.workingAt,
      completedAt: serviceRequest.completedAt,
      scheduleDate: serviceRequest.scheduleDate,
      technicianName: serviceRequest.technicianName ?? null,
      technicianNotes: serviceRequest.technicianNotes ?? null,
    }, { status: 200 });
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}

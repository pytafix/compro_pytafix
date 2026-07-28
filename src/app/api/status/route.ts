import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { statusRateLimit } from '@/lib/rate-limit';
import { normalizeWhatsApp } from '@/lib/whatsapp';

export async function GET(req: Request) {
  const rateLimitResponse = await statusRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { searchParams } = new URL(req.url);
    const trackingId = searchParams.get('trackingId')?.trim().toUpperCase();
    const whatsapp = searchParams.get('whatsapp')?.trim();

    if (!trackingId || !/^PYT-\d{4}-[A-Z0-9]{6,32}$/.test(trackingId) || !whatsapp) {
      return NextResponse.json({ error: 'ID servis dan WhatsApp wajib diisi' }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }

    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: {
        trackingId,
      },
      select: {
        trackingId: true,
        whatsapp: true,
        status: true,
        deviceType: true,
        serviceType: true,
        createdAt: true,
        diagnosedAt: true,
        workingAt: true,
        completedAt: true,
        scheduleDate: true,
      },
    });

    if (!serviceRequest || normalizeWhatsApp(serviceRequest.whatsapp) !== normalizeWhatsApp(whatsapp)) {
      return NextResponse.json({ error: 'Data servis tidak cocok' }, { status: 404, headers: { "Cache-Control": "no-store" } });
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
    }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

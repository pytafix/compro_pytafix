import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serviceRequestSchema } from '@/lib/validations';
import { generateUniqueTrackingId } from '@/lib/tracking';
import { z } from 'zod';
import { bookingRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const rateLimitResponse = await bookingRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await req.json();

    // Override schema because frontend sends 'date'
    const bookingSchema = serviceRequestSchema.extend({
      date: z.string().or(z.date()),
    }).omit({ scheduleDate: true });

    const result = bookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 400 }
      );
    }

    const validatedData = result.data;
    const trackingId = await generateUniqueTrackingId();

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        trackingId,
        name: validatedData.name,
        whatsapp: validatedData.whatsapp,
        address: validatedData.address,
        deviceType: validatedData.deviceType,
        serviceType: validatedData.serviceType,
        problemDesc: validatedData.problemDesc,
        scheduleDate: new Date(validatedData.date),
      },
    });

    return NextResponse.json({ trackingId: serviceRequest.trackingId }, { status: 200 });
  } catch (error) {
    console.error('[Booking Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
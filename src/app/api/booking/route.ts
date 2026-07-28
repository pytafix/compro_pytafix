import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serviceRequestSchema } from '@/lib/validations';
import { generateUniqueTrackingId } from '@/lib/tracking';
import { z } from 'zod';
import { bookingRateLimit } from '@/lib/rate-limit';
import { hasTrustedMutationOrigin } from '@/lib/request-origin';

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > 32_768) {
    return NextResponse.json({ error: "Permintaan terlalu besar." }, { status: 413, headers: { "Cache-Control": "no-store" } });
  }
  if (!hasTrustedMutationOrigin(req)) {
    return NextResponse.json({ error: "Permintaan tidak berasal dari situs yang dipercaya." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const rateLimitResponse = await bookingRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON tidak valid." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  try {
    // Override schema because frontend sends 'date'
    const bookingSchema = serviceRequestSchema.extend({
      date: z.coerce.date().refine(
        (date) => date >= new Date(new Date().toISOString().slice(0, 10)),
        'Schedule date cannot be in the past'
      ),
    }).omit({ scheduleDate: true });

    const result = bookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 400, headers: { "Cache-Control": "no-store" } }
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
        deviceType: validatedData.deviceBrand
          ? `${validatedData.deviceType} — ${validatedData.deviceBrand}`
          : validatedData.deviceType,
        serviceType: validatedData.serviceType,
        problemDesc: validatedData.problemDesc,
        scheduleDate: validatedData.date,
      },
    });

    return NextResponse.json(
      { trackingId: serviceRequest.trackingId },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error('[Booking Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

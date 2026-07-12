import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { withErrorHandler } from '../../../lib/api-error';
import { serviceRequestSchema } from '../../../lib/validations';
import { z } from 'zod';

// Override schema because frontend sends 'date'
const bookingSchema = serviceRequestSchema.extend({
  date: z.string().or(z.date()),
}).omit({ scheduleDate: true });

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();
  
  // Zod Validation will throw ZodError which is caught by withErrorHandler
  const validatedData = bookingSchema.parse(body);

  // Generate tracking ID: PYT-2024-XXXX
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const trackingId = `PYT-2024-${randomChars}`;

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
});

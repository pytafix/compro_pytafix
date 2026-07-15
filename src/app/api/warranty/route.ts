import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { warrantyClaimSchema } from "@/lib/validations";
import { ZodError } from "zod";
import { warrantyRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimitResponse = await warrantyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();
    const data = warrantyClaimSchema.parse(body);

    // Verify the tracking ID belongs to a real service request.
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { trackingId: data.trackingId },
      select: { id: true },
    });

    if (!serviceRequest) {
      return NextResponse.json(
        { error: "Nomor tracking tidak ditemukan. Pastikan servis sudah pernah dibooking." },
        { status: 404 }
      );
    }

    const claim = await prisma.warrantyClaim.create({
      data: {
        name: data.name,
        whatsapp: data.whatsapp,
        trackingId: data.trackingId,
        description: data.description,
        status: "MENUNGGU",
      },
    });

    return NextResponse.json(claim, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating warranty claim:", error);
    return NextResponse.json({ error: "Gagal mengirim klaim garansi" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { contactRateLimit } from "@/lib/rate-limit";
import { indonesianWhatsAppSchema } from "@/lib/whatsapp";

const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid").or(z.literal("")),
  whatsapp: indonesianWhatsAppSchema,
  subject: z.string().min(1, "Subjek wajib diisi"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export async function POST(request: Request) {
  const rateLimitResponse = await contactRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Persist the submission so it is not lost.
    await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        whatsapp: validatedData.whatsapp,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pesan kamu sudah terkirim. Kami akan menghubungi kamu segera.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}

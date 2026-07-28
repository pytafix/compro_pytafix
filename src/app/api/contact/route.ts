import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { contactRateLimit } from "@/lib/rate-limit";
import { indonesianWhatsAppSchema, normalizeWhatsApp } from "@/lib/whatsapp";
import { hasTrustedMutationOrigin } from "@/lib/request-origin";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nama wajib diisi").max(100),
  email: z.string().trim().email("Email tidak valid").max(254).or(z.literal("")),
  whatsapp: indonesianWhatsAppSchema,
  subject: z.string().trim().min(3, "Subjek wajib diisi").max(150),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter").max(3000),
}).strict();

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_768) {
    return NextResponse.json({ error: "Permintaan terlalu besar." }, { status: 413, headers: { "Cache-Control": "no-store" } });
  }
  if (!hasTrustedMutationOrigin(request)) {
    return NextResponse.json({ error: "Permintaan tidak berasal dari situs yang dipercaya." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const rateLimitResponse = await contactRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON tidak valid." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const validatedData = contactSchema.parse(body);

    // Persist the submission so it is not lost.
    await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        whatsapp: normalizeWhatsApp(validatedData.whatsapp),
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pesan kamu sudah tersimpan. Tim akan meninjaunya sesuai antrean dan jam operasional.",
      },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.issues },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pesan" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

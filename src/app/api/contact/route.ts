import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid").or(z.literal("")),
  whatsapp: z.string().min(10, "Nomor WhatsApp wajib diisi"),
  subject: z.string().min(1, "Subjek wajib diisi"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Store in database (you can create a Contact model or use a simple log)
    // For now we store via Prisma if you add a Contact model
    // Or we can send via email — integrate with your email provider

    console.log("[Contact Form]", {
      name: validatedData.name,
      email: validatedData.email,
      whatsapp: validatedData.whatsapp,
      subject: validatedData.subject,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
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

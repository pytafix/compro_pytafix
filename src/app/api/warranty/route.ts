import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.whatsapp || !data.trackingId || !data.description) {
      return NextResponse.json({ error: "Semua kolom wajib diisi" }, { status: 400 });
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
    console.error("Error creating warranty claim:", error);
    return NextResponse.json({ error: "Gagal mengirim klaim garansi" }, { status: 500 });
  }
}

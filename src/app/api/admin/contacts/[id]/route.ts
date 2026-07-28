import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const contactPatchSchema = z.object({
  read: z.boolean(),
}).strict();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON tidak valid" }, { status: 400 });
  }

  const parsed = contactPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validasi gagal", details: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const { id } = await params;
    const contact = await prisma.contact.update({
      where: { id },
      data: { read: parsed.data.read },
    });
    return NextResponse.json(contact);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Pesan tidak ditemukan" },
        { status: 404 }
      );
    }
    console.error("Failed to update contact message:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui pesan kontak" },
      { status: 500 }
    );
  }
}

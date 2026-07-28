import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const contactQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(100000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
  status: z.enum(["all", "unread", "read"]).default("all"),
  query: z.string().trim().max(100).default(""),
});

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (auth) return auth;

  const url = new URL(request.url);
  const parsed = contactQuerySchema.safeParse({
    page: url.searchParams.get("page") || undefined,
    pageSize: url.searchParams.get("pageSize") || undefined,
    status: url.searchParams.get("status") || undefined,
    query: url.searchParams.get("query") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Parameter tidak valid", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { page, pageSize, status, query } = parsed.data;
  const where: Prisma.ContactWhereInput = {
    ...(status === "unread" ? { read: false } : {}),
    ...(status === "read" ? { read: true } : {}),
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { whatsapp: { contains: query, mode: "insensitive" } },
            { subject: { contains: query, mode: "insensitive" } },
            { message: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  try {
    const [items, total, unreadCount] = await prisma.$transaction([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.contact.count({ where }),
      prisma.contact.count({ where: { read: false } }),
    ]);

    return NextResponse.json({
      items,
      unreadCount,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    });
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return NextResponse.json(
      { error: "Gagal mengambil pesan kontak" },
      { status: 500 }
    );
  }
}

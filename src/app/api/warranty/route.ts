import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { warrantyClaimSchema } from "@/lib/validations";
import { ZodError } from "zod";
import { warrantyRateLimit } from "@/lib/rate-limit";
import { normalizeWhatsApp } from "@/lib/whatsapp";
import { Prisma } from "@prisma/client";
import { ACTIVE_WARRANTY_STATUSES } from "@/lib/warranty";
import { hasTrustedMutationOrigin } from "@/lib/request-origin";

const MAX_TRANSACTION_RETRIES = 3;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_768) {
    return NextResponse.json({ error: "Permintaan terlalu besar." }, { status: 413, headers: { "Cache-Control": "no-store" } });
  }
  if (!hasTrustedMutationOrigin(request)) {
    return NextResponse.json({ error: "Permintaan tidak berasal dari situs yang dipercaya." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const rateLimitResponse = await warrantyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON tidak valid." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const data = warrantyClaimSchema.parse(body);

    for (let attempt = 0; attempt < MAX_TRANSACTION_RETRIES; attempt += 1) {
      try {
        const result = await prisma.$transaction(
          async (transaction) => {
            const serviceRequest = await transaction.serviceRequest.findUnique({
              where: { trackingId: data.trackingId },
              select: {
                whatsapp: true,
                status: true,
                warrantyClaims: {
                  where: { status: { in: ACTIVE_WARRANTY_STATUSES } },
                  select: { id: true },
                  take: 1,
                },
              },
            });

            if (
              !serviceRequest ||
              normalizeWhatsApp(serviceRequest.whatsapp) !==
                normalizeWhatsApp(data.whatsapp)
            ) {
              return { outcome: "not_found" as const };
            }
            if (serviceRequest.status !== "SELESAI") {
              return { outcome: "service_incomplete" as const };
            }
            if (serviceRequest.warrantyClaims.length > 0) {
              return { outcome: "active_claim" as const };
            }

            const claim = await transaction.warrantyClaim.create({
              data: {
                name: data.name,
                whatsapp: normalizeWhatsApp(data.whatsapp),
                trackingId: data.trackingId,
                description: data.description,
                status: "MENUNGGU",
              },
              select: { id: true, status: true },
            });

            return { outcome: "created" as const, claim };
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
        );

        if (result.outcome === "not_found") {
          return NextResponse.json(
            { error: "Data servis tidak cocok." },
            { status: 404, headers: { "Cache-Control": "no-store" } }
          );
        }
        if (result.outcome === "service_incomplete") {
          return NextResponse.json(
            { error: "Klaim dapat diajukan setelah servis berstatus selesai." },
            { status: 409, headers: { "Cache-Control": "no-store" } }
          );
        }
        if (result.outcome === "active_claim") {
          return NextResponse.json(
            { error: "Masih ada klaim aktif untuk ID servis ini." },
            { status: 409, headers: { "Cache-Control": "no-store" } }
          );
        }

        return NextResponse.json(result.claim, {
          status: 201,
          headers: { "Cache-Control": "no-store" },
        });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2034"
        ) {
          continue;
        }
        throw error;
      }
    }

    return NextResponse.json(
      { error: "Klaim lain sedang diproses untuk ID servis ini. Silakan periksa kembali." },
      { status: 409, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.issues },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    console.error("Error creating warranty claim:", error);
    return NextResponse.json({ error: "Gagal mengirim klaim garansi" }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

import { randomBytes } from "crypto";
import prisma from "./prisma";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomSuffix(length: number): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

export async function generateUniqueTrackingId(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `PYT-${year}-`;

  for (let i = 0; i < 10; i++) {
    const candidate = prefix + randomSuffix(6);
    const existing = await prisma.serviceRequest.findUnique({
      where: { trackingId: candidate },
      select: { id: true },
    });
    if (!existing) return candidate;
  }

  const uuid = randomBytes(16).toString("hex").toUpperCase().slice(0, 8);
  return prefix + uuid;
}
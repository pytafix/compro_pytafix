import { z } from "zod";

export function isValidIndonesianWhatsApp(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  
  if (cleaned.startsWith("62")) {
    return cleaned.length >= 11 && cleaned.length <= 13 && /^628\d{8,10}$/.test(cleaned);
  }
  
  if (cleaned.startsWith("08")) {
    return cleaned.length >= 10 && cleaned.length <= 12 && /^08\d{8,10}$/.test(cleaned);
  }
  
  return false;
}

export function normalizeWhatsApp(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  
  if (cleaned.startsWith("08")) {
    return "62" + cleaned.slice(1);
  }
  
  if (cleaned.startsWith("62")) {
    return cleaned;
  }
  
  return cleaned;
}

export function formatWhatsAppDisplay(phone: string): string {
  const normalized = normalizeWhatsApp(phone);
  if (normalized.startsWith("62")) {
    const rest = normalized.slice(2);
    return `+62 ${rest.slice(0, 4)}-${rest.slice(4, 8)}-${rest.slice(8)}`;
  }
  return phone;
}

export const indonesianWhatsAppSchema = z.string()
  .min(10, "Nomor WhatsApp tidak valid")
  .refine(isValidIndonesianWhatsApp, "Format nomor WhatsApp Indonesia tidak valid (contoh: 08xx-xxxx-xxxx atau 628xx-xxxx-xxxx)");
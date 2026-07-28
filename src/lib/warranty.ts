import type { WarrantyStatus } from "@prisma/client";

export const ACTIVE_WARRANTY_STATUSES: WarrantyStatus[] = ["MENUNGGU", "DIPROSES"];

const WARRANTY_STATUS_TRANSITIONS: Record<WarrantyStatus, readonly WarrantyStatus[]> = {
  MENUNGGU: ["DIPROSES", "DITOLAK"],
  DIPROSES: ["SELESAI", "DITOLAK"],
  SELESAI: [],
  DITOLAK: [],
};

export function canTransitionWarrantyStatus(
  currentStatus: WarrantyStatus,
  nextStatus: WarrantyStatus
): boolean {
  return (
    currentStatus === nextStatus ||
    WARRANTY_STATUS_TRANSITIONS[currentStatus].includes(nextStatus)
  );
}

export function getAllowedWarrantyStatuses(
  currentStatus: WarrantyStatus
): WarrantyStatus[] {
  return [currentStatus, ...WARRANTY_STATUS_TRANSITIONS[currentStatus]];
}

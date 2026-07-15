import { describe, it, expect } from 'vitest';
import { 
  isValidIndonesianWhatsApp, 
  normalizeWhatsApp, 
  formatWhatsAppDisplay,
  indonesianWhatsAppSchema 
} from '@/lib/whatsapp';

describe('WhatsApp Validation', () => {
  describe('isValidIndonesianWhatsApp', () => {
    it('should accept valid 08xx numbers (10-12 digits)', () => {
      expect(isValidIndonesianWhatsApp('08123456789')).toBe(true);  // 11 digits
      expect(isValidIndonesianWhatsApp('081234567890')).toBe(true); // 12 digits
      expect(isValidIndonesianWhatsApp('0812-3456-789')).toBe(true); // with dashes
      expect(isValidIndonesianWhatsApp('0812 3456 789')).toBe(true); // with spaces
    });

    it('should accept valid 628xx numbers (11-13 digits)', () => {
      expect(isValidIndonesianWhatsApp('628123456789')).toBe(true);  // 12 digits
      expect(isValidIndonesianWhatsApp('6281234567890')).toBe(true); // 13 digits
      expect(isValidIndonesianWhatsApp('62 812-3456-789')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidIndonesianWhatsApp('081234567')).toBe(false);    // too short (9 digits)
      expect(isValidIndonesianWhatsApp('0812345678901')).toBe(false); // too long (13 digits)
      expect(isValidIndonesianWhatsApp('0212345678')).toBe(false);    // not starting with 08
      expect(isValidIndonesianWhatsApp('6281234567')).toBe(false);   // too short (10 digits)
      expect(isValidIndonesianWhatsApp('62812345678901')).toBe(false); // too long (14 digits)
      expect(isValidIndonesianWhatsApp('')).toBe(false);
      expect(isValidIndonesianWhatsApp('abc')).toBe(false);
    });
  });

  describe('normalizeWhatsApp', () => {
    it('should convert 08xx to 628xx', () => {
      expect(normalizeWhatsApp('08123456789')).toBe('628123456789');
      expect(normalizeWhatsApp('0812-3456-789')).toBe('628123456789');
    });

    it('should keep 628xx as is', () => {
      expect(normalizeWhatsApp('628123456789')).toBe('628123456789');
      expect(normalizeWhatsApp('62 812-3456-789')).toBe('628123456789');
    });

    it('should handle other formats', () => {
      expect(normalizeWhatsApp('08123456789')).toBe('628123456789');
    });
  });

  describe('formatWhatsAppDisplay', () => {
    it('should format 628xx to +62 xxxx-xxxx-xxx', () => {
      expect(formatWhatsAppDisplay('628123456789')).toBe('+62 8123-4567-89');
      expect(formatWhatsAppDisplay('08123456789')).toBe('+62 8123-4567-89');
    });
  });

  describe('indonesianWhatsAppSchema', () => {
    it('should parse valid numbers', () => {
      const result = indonesianWhatsAppSchema.safeParse('08123456789');
      expect(result.success).toBe(true);
    });

    it('should reject invalid numbers', () => {
      const result = indonesianWhatsAppSchema.safeParse('081234567');
      expect(result.success).toBe(false);
    });
  });
});
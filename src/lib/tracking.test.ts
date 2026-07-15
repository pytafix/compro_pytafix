import { describe, it, expect } from 'vitest';
import { generateUniqueTrackingId } from '@/lib/tracking';

describe('Tracking ID Generation', () => {
  it('should generate valid format PYT-YYYY-XXXXXX', async () => {
    const id = await generateUniqueTrackingId();
    const year = new Date().getFullYear();
    expect(id).toMatch(new RegExp(`^PYT-${year}-[A-Z0-9]{6,8}$`));
  });

  it('should generate unique IDs on multiple calls', async () => {
    const ids = new Set();
    for (let i = 0; i < 10; i++) {
      const id = await generateUniqueTrackingId();
      expect(ids.has(id)).toBe(false);
      ids.add(id);
    }
  });

  it('should include current year in prefix', async () => {
    const id = await generateUniqueTrackingId();
    const year = new Date().getFullYear();
    expect(id.startsWith(`PYT-${year}-`)).toBe(true);
  });
});
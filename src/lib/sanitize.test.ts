import { describe, it, expect } from 'vitest';
import { sanitizeContent, sanitizeExcerpt } from '@/lib/sanitize';

describe('Content Sanitization', () => {
  describe('sanitizeContent', () => {
    it('should allow safe HTML tags', () => {
      const input = '<p>Hello <strong>world</strong></p>';
      const output = sanitizeContent(input);
      expect(output).toContain('<p>Hello <strong>world</strong></p>');
    });

    it('should strip script tags', () => {
      const input = '<p>Safe</p><script>alert("xss")</script>';
      const output = sanitizeContent(input);
      expect(output).not.toContain('<script>');
      expect(output).toContain('<p>Safe</p>');
    });

    it('should strip iframe tags', () => {
      const input = '<p>Safe</p><iframe src="evil.com"></iframe>';
      const output = sanitizeContent(input);
      expect(output).not.toContain('<iframe>');
      expect(output).toContain('<p>Safe</p>');
    });

    it('should allow links with valid schemes', () => {
      const input = '<a href="https://example.com">Link</a>';
      const output = sanitizeContent(input);
      expect(output).toContain('<a href="https://example.com">Link</a>');
    });

    it('should strip links with javascript scheme', () => {
      const input = '<a href="javascript:alert(1)">XSS</a>';
      const output = sanitizeContent(input);
      expect(output).not.toContain('javascript:');
    });

    it('should allow images with valid attributes', () => {
      const input = '<img src="https://example.com/img.jpg" alt="Image" width="100" height="100">';
      const output = sanitizeContent(input);
      expect(output).toContain('src="https://example.com/img.jpg"');
      expect(output).toContain('alt="Image"');
    });

    it('should handle empty input', () => {
      expect(sanitizeContent('')).toBe('');
      expect(sanitizeContent('   ')).toBe('   ');
    });

    it('should allow table elements', () => {
      const input = '<table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Cell</td></tr></tbody></table>';
      const output = sanitizeContent(input);
      expect(output).toContain('<table>');
      expect(output).toContain('<thead>');
      expect(output).toContain('<tbody>');
    });
  });

  describe('sanitizeExcerpt', () => {
    it('should only allow basic formatting', () => {
      const input = '<p>Hello <strong>bold</strong> <em>italic</em> <a href="https://example.com">link</a></p>';
      const output = sanitizeExcerpt(input);
      expect(output).toContain('<strong>bold</strong>');
      expect(output).toContain('<em>italic</em>');
      expect(output).toContain('<a href="https://example.com">link</a>');
    });

    it('should strip complex elements', () => {
      const input = '<div><script>alert(1)</script><img src="x" onerror="alert(1)"></div>';
      const output = sanitizeExcerpt(input);
      expect(output).not.toContain('<script>');
      expect(output).not.toContain('onerror');
    });
  });
});
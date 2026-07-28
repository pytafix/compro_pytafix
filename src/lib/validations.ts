import { z } from 'zod';
import { indonesianWhatsAppSchema } from './whatsapp';

const trimmedText = (min: number, max: number, message: string) =>
  z.string().trim().min(min, message).max(max, `Maximum ${max} characters`);
const slugSchema = z
  .string()
  .trim()
  .min(2, 'Slug is required')
  .max(100, 'Slug is too long')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must use lowercase kebab-case');
const ALLOWED_IMAGE_HOSTS = new Set([
  'images.unsplash.com',
  'plus.unsplash.com',
  'lh3.googleusercontent.com',
  'cdn.simpleicons.org',
  'www.pytafix.web.id',
  'pytafix.web.id',
]);
const imageUrlSchema = z.string().trim().max(2048).refine((value) => {
  if (value === '' || value.startsWith('/')) return true;
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      (ALLOWED_IMAGE_HOSTS.has(url.hostname) ||
        url.hostname.endsWith('.public.blob.vercel-storage.com'))
    );
  } catch {
    return false;
  }
}, 'Image URL is not from an allowed source');

// Service Request Schema (public booking)
export const serviceRequestSchema = z.object({
  name: trimmedText(2, 100, 'Name is required'),
  whatsapp: indonesianWhatsAppSchema,
  address: trimmedText(5, 500, 'Address is required'),
  deviceType: z.enum(['smartphone', 'laptop', 'tablet', 'console', 'other']),
  deviceBrand: trimmedText(2, 100, 'Device brand is required').optional(),
  serviceType: z.enum(['screen', 'battery', 'water', 'software', 'diagnostic', 'other']),
  problemDesc: trimmedText(10, 2000, 'Problem description is required'),
  scheduleDate: z.coerce.date(),
}).strict();

// Admin Auth Schema
export const loginSchema = z.object({
  password: z.string().min(1, 'Password is required').max(256),
}).strict();

// ─── Shared enums ──────────────────────────────────────────────────────────────
const productCategoryEnum = z.enum(['LAPTOP', 'HP', 'TABLET']);
const productConditionEnum = z.enum(['BARU', 'BEKAS', 'REFURBISHED']);
const marketplaceEnum = z.enum(['SHOPEE', 'TOKOPEDIA', 'BLIBLI', 'LAZADA']);
const serviceStatusEnum = z.enum([
  'DITERIMA',
  'DIAGNOSA',
  'DIKERJAKAN',
  'MENUNGGU_SPAREPART',
  'SELESAI',
  'DIBATALKAN',
]);
const warrantyStatusEnum = z.enum(['MENUNGGU', 'DIPROSES', 'SELESAI', 'DITOLAK']);

const marketplaceLinkSchema = z.object({
  marketplace: marketplaceEnum,
  url: z.string().url('Marketplace URL must be valid').refine(
    (value) => value.startsWith('https://'),
    'Marketplace URL must use HTTPS'
  ),
}).strict().refine(({ marketplace, url }) => {
  const hostname = new URL(url).hostname.toLowerCase();
  const allowedHosts: Record<string, string[]> = {
    SHOPEE: ['shopee.co.id', 'shopee.id'],
    TOKOPEDIA: ['tokopedia.com'],
    BLIBLI: ['blibli.com'],
    LAZADA: ['lazada.co.id'],
  };
  return allowedHosts[marketplace].some(
    (host) => hostname === host || hostname.endsWith(`.${host}`)
  );
}, 'Marketplace URL host does not match the selected marketplace');
const marketplaceLinksSchema = z
  .array(marketplaceLinkSchema)
  .max(4, 'Maximum 4 marketplace links')
  .refine(
    (links) => new Set(links.map(({ marketplace }) => marketplace)).size === links.length,
    'Each marketplace may only be listed once'
  );

// ─── Article ───────────────────────────────────────────────────────────────────
export const articleSchema = z.object({
  slug: slugSchema,
  title: trimmedText(5, 120, 'Title is required'),
  excerpt: trimmedText(20, 320, 'Excerpt is required'),
  content: trimmedText(50, 100000, 'Content is required'),
  imageUrl: imageUrlSchema.refine((value) => value.length > 0, 'Image URL is required'),
  author: z.string().min(1, 'Author is required'),
  publishedAt: z.string().optional(),
});

// ─── Product ──────────────────────────────────────────────────────────────────
export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: productCategoryEnum,
  condition: productConditionEnum,
  description: z.string().optional(),
  price: z.coerce.number().int().nonnegative('Price must be a positive integer'),
  stock: z.coerce.number().int().nonnegative('Stock must be a positive integer'),
  imageUrl: imageUrlSchema.optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  marketplaceLinks: marketplaceLinksSchema.optional(),
});

// ─── Service Content ───────────────────────────────────────────────────────────
export const serviceContentSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().optional(),
  icon: z.string().optional(),
  imageUrl: imageUrlSchema.optional(),
  isActive: z.boolean().optional(),
});

// ─── Sparepart ─────────────────────────────────────────────────────────────────
export const sparepartSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  price: z.coerce.number().int().nonnegative('Price must be a positive integer'),
  stock: z.coerce.number().int().nonnegative('Stock must be a positive integer'),
  imageUrl: imageUrlSchema.optional(),
  isFeatured: z.boolean().optional(),
  condition: z.string().optional(),
  marketplaceLinks: marketplaceLinksSchema.optional(),
});

// ─── Service Request (admin create/update) ─────────────────────────────────────
export const serviceRequestAdminSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  whatsapp: z.string().min(1, 'WhatsApp is required'),
  address: z.string().optional(),
  deviceType: z.string().min(1, 'Device type is required'),
  serviceType: z.string().optional(),
  problemDesc: z.string().min(1, 'Problem description is required'),
  scheduleDate: z.string().optional(),
  status: serviceStatusEnum.optional(),
  technicianName: z.string().optional(),
  technicianNotes: z.string().optional(),
});

// ─── Promo ─────────────────────────────────────────────────────────────────────
export const promoSchema = z.object({
  slug: slugSchema,
  badge: z.string().min(1, 'Badge is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  validUntil: z.string().min(1, 'validUntil is required').or(z.date()),
  terms: z.string().min(1, 'Terms is required'),
  howToClaim: z.string().min(1, 'howToClaim is required'),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

// ─── Portfolio ─────────────────────────────────────────────────────────────────
export const portfolioSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  deviceType: z.string().min(1, 'Device type is required'),
  problemType: z.string().min(1, 'Problem type is required'),
  beforeImage: imageUrlSchema.refine((value) => value.length > 0, 'Before image is required'),
  afterImage: imageUrlSchema.refine((value) => value.length > 0, 'After image is required'),
  completionDate: z.string().optional(),
});

// ─── Testimonial ───────────────────────────────────────────────────────────────
export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  rating: z.coerce.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(1, 'Comment is required'),
  isFeatured: z.boolean().optional(),
});

// ─── FAQ ───────────────────────────────────────────────────────────────────────
export const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  isActive: z.boolean().optional(),
});

// ─── Warranty Claim (public) ───────────────────────────────────────────────────
export const warrantyClaimSchema = z.object({
  name: trimmedText(2, 100, 'Name is required'),
  whatsapp: indonesianWhatsAppSchema,
  trackingId: z.string().trim().toUpperCase().regex(
    /^PYT-\d{4}-[A-Z0-9]{6,32}$/,
    'Tracking ID is invalid'
  ),
  description: trimmedText(10, 2000, 'Description is required'),
}).strict();

export { serviceStatusEnum, warrantyStatusEnum };

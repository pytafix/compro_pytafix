import { z } from 'zod';
import { indonesianWhatsAppSchema } from './whatsapp';

// Service Request Schema (public booking)
export const serviceRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  whatsapp: indonesianWhatsAppSchema,
  address: z.string().min(1, 'Address is required'),
  deviceType: z.string().min(1, 'Device type is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  problemDesc: z.string().min(1, 'Problem description is required'),
  scheduleDate: z.string().or(z.date()),
});

// Admin Auth Schema
export const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

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
  url: z.string().min(1, 'Marketplace URL is required'),
});

// ─── Article ───────────────────────────────────────────────────────────────────
export const articleSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
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
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  marketplaceLinks: z.array(marketplaceLinkSchema).optional(),
});

// ─── Service Content ───────────────────────────────────────────────────────────
export const serviceContentSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().optional(),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
});

// ─── Sparepart ─────────────────────────────────────────────────────────────────
export const sparepartSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  price: z.coerce.number().int().nonnegative('Price must be a positive integer'),
  stock: z.coerce.number().int().nonnegative('Stock must be a positive integer'),
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().optional(),
  condition: z.string().optional(),
  marketplaceLinks: z.array(marketplaceLinkSchema).optional(),
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
  slug: z.string().min(1, 'Slug is required'),
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
  beforeImage: z.string().min(1, 'Before image is required'),
  afterImage: z.string().min(1, 'After image is required'),
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
  name: z.string().min(1, 'Name is required'),
  whatsapp: indonesianWhatsAppSchema,
  trackingId: z.string().min(1, 'Tracking ID is required'),
  description: z.string().min(1, 'Description is required'),
});

export { serviceStatusEnum, warrantyStatusEnum };

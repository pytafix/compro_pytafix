import { z } from 'zod';

// Service Request Schema
export const serviceRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  whatsapp: z.string().min(10, 'Valid WhatsApp number is required'),
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

// Add more schemas here as needed for other entities like Spareparts, Promos, etc.

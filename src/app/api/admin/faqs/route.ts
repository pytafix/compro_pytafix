import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { faqSchema } from '@/lib/validations';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch faqs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const body = await request.json();
    const data = faqSchema.parse(body);

    const faq = await prisma.faq.create({
      data: {
        question: data.question,
        answer: data.answer,
        isActive: data.isActive ?? true
      }
    });

    revalidatePath('/');
    revalidatePath('/faq');
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create faq' }, { status: 500 });
  }
}

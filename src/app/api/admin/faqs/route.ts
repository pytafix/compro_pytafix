import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { id: 'desc' }
    });
        revalidatePath('/faq', 'layout');
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch faqs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer, isActive } = body;
    
    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        isActive: isActive ?? true
      }
    });
    
        revalidatePath('/faq', 'layout');
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create faq' }, { status: 500 });
  }
}

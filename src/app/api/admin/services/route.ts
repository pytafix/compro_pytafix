import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { serviceContentSchema } from '@/lib/validations';

export async function GET() {
  try {
    const services = await prisma.serviceContent.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = serviceContentSchema.parse(body);

    const service = await prisma.serviceContent.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        content: data.content ?? null,
        icon: data.icon ?? null,
        imageUrl: data.imageUrl ?? null,
        isActive: data.isActive ?? true
      }
    });

    revalidatePath('/');
    revalidatePath('/layanan');
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

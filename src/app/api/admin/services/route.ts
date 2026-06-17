import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.serviceContent.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, description, content, icon, imageUrl, isActive } = body;
    
    const service = await prisma.serviceContent.create({
      data: {
        slug,
        title,
        description,
        content,
        icon,
        imageUrl,
        isActive: isActive ?? true
      }
    });
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const claims = await prisma.warrantyClaim.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(claims);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch warranty claims' }, { status: 500 });
  }
}

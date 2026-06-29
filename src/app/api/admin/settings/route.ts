import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
      settingsMap[s.id] = s.content;
    });
        revalidatePath('/syarat-ketentuan', 'layout');
    revalidatePath('/kebijakan-privasi', 'layout');
    return NextResponse.json(settingsMap);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    for (const [id, content] of Object.entries(body)) {
      if (typeof content === 'string') {
        await prisma.setting.upsert({
          where: { id },
          update: { content },
          create: { id, content },
        });
      }
    }
    
        revalidatePath('/syarat-ketentuan', 'layout');
    revalidatePath('/kebijakan-privasi', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

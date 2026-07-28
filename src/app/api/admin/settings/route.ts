import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

const ALLOWED_SETTING_IDS = new Set(['terms', 'privacy']);
const MAX_SETTING_LENGTH = 100_000;

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
      settingsMap[s.id] = s.content;
    });
    return NextResponse.json(settingsMap);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid settings payload' }, { status: 400 });
    }

    const entries = Object.entries(body).filter(
      ([id, content]) =>
        ALLOWED_SETTING_IDS.has(id) &&
        typeof content === 'string' &&
        content.length <= MAX_SETTING_LENGTH
    ) as Array<[string, string]>;
    if (entries.length !== Object.keys(body).length) {
      return NextResponse.json({ error: 'Invalid setting key or content size' }, { status: 400 });
    }

    await prisma.$transaction(
      entries.map(([id, content]) =>
        prisma.setting.upsert({
          where: { id },
          update: { content },
          create: { id, content },
        })
      )
    );

    revalidatePath('/');
    revalidatePath('/syarat-ketentuan');
    revalidatePath('/kebijakan-privasi');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

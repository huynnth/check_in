import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from '@/utils/jwt';

export async function POST(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const payload: any = getToken(token!);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { telegramId } = await req.json();
    await prisma.user.update({
        where: { id: payload.id },
        data: { telegramId },
    });

    return NextResponse.json({ status: 'ok' });
}


import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token || !token.email) {
            return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
        }

        const body = await req.json();
        const { telegramId, chatId } = body;

        if (!telegramId || !chatId) {
            return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 });
        }

        await prisma.user.update({
            where: { email: token.email },
            data: {
                telegramId: telegramId.toString(),
                chatId: chatId.toString(),
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(' Lỗi khi liên kết Telegram:', error);
        return NextResponse.json({ error: 'Đã xảy ra lỗi server' }, { status: 500 });
    }
}

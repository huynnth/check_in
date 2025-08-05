// src/app/api/attendance/check-in/route.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET!;
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

export async function POST(req: NextRequest) {
  try {

    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = payload.id;


    await prisma.attendance.create({
      data: {
        userId,
        present: true,
      },
    });


    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.telegramId) {
      await fetch(TELEGRAM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: user.telegramId,
          text: 'Bạn đã điểm danh thành công.',
        }),
      });
    }

    return new Response(JSON.stringify({ message: 'Điểm danh thành công' }), {
      status: 200,
    });
  } catch (err: any) {
    console.error('Lỗi check-in:', err.message);
    return new Response(JSON.stringify({ message: 'Lỗi máy chủ' }), {
      status: 500,
    });
  }
}

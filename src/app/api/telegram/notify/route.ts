import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

export async function POST() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const users = await prisma.user.findMany({
        where: { role: 'USER' },
        include: {
            attendance: {
                where: { date: today },
            },
        },
    });

    for (const user of users) {
        if (!user.telegramId) continue;
        const markedToday = user.attendance.some((a) => a.present);
        if (!markedToday) {
            await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
                chat_id: user.telegramId,
                text: `Bạn đã vắng mặt hôm nay (${today.toLocaleDateString('vi-VN')})!`,
            });
        }
    }

    return NextResponse.json({ status: 'done' });
}

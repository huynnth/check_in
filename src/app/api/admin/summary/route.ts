import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from '@/utils/jwt';
import dayjs from 'dayjs';

export async function GET(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const payload: any = getToken(token!);
    if (payload.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const users = await prisma.user.findMany({
        where: { role: 'USER' },
        include: { attendance: true },
    });

    const uniqueDates = Array.from(
        new Set(
            users.flatMap((u) => u.attendance.map((a) => dayjs(a.date).format('YYYY-MM-DD')))
        )
    ).sort();

    const formatted = users.map((u) => {
        const row: any = { email: u.email };
        let absentCount = 0;
        uniqueDates.forEach((date) => {
            const att = u.attendance.find((a) => dayjs(a.date).format('YYYY-MM-DD') === date);
            const present = att?.present || false;
            row[date] = present;
            if (!present) absentCount++;
        });
        row.absentCount = absentCount;
        return row;
    });

    return NextResponse.json({ users: formatted, dates: uniqueDates });
}
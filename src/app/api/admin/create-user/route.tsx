import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getToken } from '@/utils/jwt';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: 'Thiếu token' }, { status: 401 });
    }

    const payload: any = getToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Token không hợp lệ' }, { status: 401 });
    }

    if (payload.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 });
    }

    const { email, password, role } = await req.json();

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
        return NextResponse.json({ error: 'Email đã tồn tại' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { email, password: hash, role },
    });

    return NextResponse.json({ id: newUser.id });
}

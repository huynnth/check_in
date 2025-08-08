import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    console.log('INPUT:', { email, password });

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.log('User not found');
        return NextResponse.json({ error: 'Email không tồn tại' }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log('Password match:', match);

    if (!match) {
        return NextResponse.json({ error: 'Sai mật khẩu' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
    });

    return NextResponse.json({ token });
}

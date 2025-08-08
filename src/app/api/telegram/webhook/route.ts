
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const body = await req.json();
    const message = body.message;

    const telegramId = message?.from?.id;
    const chatId = message?.chat?.id;
    const text = message?.text;

    if (text === '/start') {
        await sendMessage(chatId, `Chào bạn! Nhấn vào link sau để liên kết tài khoản sinh viên:\n\n` +
            `https://${process.env.NEXT_PUBLIC_SITE_URL}/user/link-telegram?telegramId=${telegramId}&chatId=${chatId}`);
    }

    return NextResponse.json({ ok: true });
}

async function sendMessage(chatId: string, text: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN!;
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
    });
}

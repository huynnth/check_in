import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendMessage(chatId: number | string, text: string) {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    const chatId = body?.message?.chat?.id;
    const text = body?.message?.text;

    if (!chatId || !text) {
        return NextResponse.json({ ok: false });
    }

    if (text.startsWith('/start')) {
        await sendMessage(chatId, `Xin chào! Đây là bot test\nGõ /help để xem hướng dẫn.`);
    } else if (text.startsWith('/check')) {
        await sendMessage(chatId, `Bạn đã điểm danh thành công lúc ${new Date().toLocaleTimeString()}`);
    } else if (text.startsWith('/help')) {
        await sendMessage(chatId, `Các lệnh có sẵn:\n/start - Bắt đầu\n/check - Điểm danh\n/help - Trợ giúp`);
    } else if (text.startsWith('hello')) {
        await sendMessage(chatId, `Xin chào, bạn cần tôi giúp gì ?`);
    } else {
        await sendMessage(chatId, `Bạn vừa gửi: ${text}\nGõ /help để xem hướng dẫn.`);
    }

    return NextResponse.json({ ok: true });
}

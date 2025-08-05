// app/api/telegram/route.ts
import { NextRequest } from 'next/server';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${token}`;

export async function POST(req: NextRequest) {
    const body = await req.json();
    const message = body.message;
    console.log(JSON.stringify(body, null, 2));


    if (message) {
        const chatId = message.chat.id;
        const text = message.text;

        if (text === '/start') {
            await sendMessage(chatId, 'Xin chào từ bot Next.js App Router!');
        } else {
            await sendMessage(chatId, `Bạn vừa nói: ${text}`);
        }
    }

    return new Response("OK", { status: 200 });
}

async function sendMessage(chatId: number, text: string) {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
    });
}

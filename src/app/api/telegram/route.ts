// app/api/telegram/route.ts
import { NextRequest } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(token);

// Set webhook URL (nên chỉ gọi 1 lần)
bot.setWebHook(`${process.env.NEXT_PUBLIC_SITE_URL}/api/telegram`);

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '👋 Xin chào từ bot Next.js App Router!');
});

bot.on("message", (msg) => {
    if (!msg.text?.startsWith("/")) {
        bot.sendMessage(msg.chat.id, `📩 Bạn vừa nói: ${msg.text}`);
    }
});

// Xử lý request Telegram gửi đến
export async function POST(req: NextRequest) {
    const body = await req.json();
    bot.processUpdate(body); // Gửi dữ liệu vào bot
    return new Response("OK", { status: 200 });
}

export async function sendTelegramMessage(chatId: string, message: string) {
    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    });
}
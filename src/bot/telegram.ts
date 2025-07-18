import express from "express";
import { prisma } from "../lib/prisma";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(express.json());

app.post(`/webhook/${process.env.TELEGRAM_BOT_TOKEN}`, async (req, res) => {
    const msg = req.body.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";

    if (text.startsWith("/vang")) {
        const studentId = text.split(" ")[1];
        if (!studentId) {
            return send(chatId, "Vui lòng nhập MSSV sau lệnh /vang");
        }

        const user = await prisma.user.findUnique({ where: { studentId } });
        if (!user) return send(chatId, "Không tìm thấy sinh viên");

        const all = await prisma.attendance.findMany({ where: { userId: user.id } });
        const vangs = all.filter(x => !x.present).length;

        return send(chatId, `Bạn đã vắng ${vangs} buổi.`);
    }

    res.sendStatus(200);
});

function send(chatId: string, message: string) {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
    });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Bot đang chạy trên port " + PORT));
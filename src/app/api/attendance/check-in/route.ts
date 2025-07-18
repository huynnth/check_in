import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const userId = "mock-user-id"; // Thay bằng ID thực tế sau khi đăng nhập

  try {
    await prisma.attendance.create({
      data: {
        userId,
        present: true,
      },
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.telegramChatId) {
      await sendTelegramMessage(user.telegramChatId, "Bạn đã điểm danh thành công.");
    }

    res.status(200).json({ message: "Checked in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
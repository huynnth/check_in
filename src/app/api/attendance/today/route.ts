import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await prisma.attendance.findMany({
    where: {
      date: { gte: today }
    },
    include: {
      user: true
    }
  });

  const result = attendance.map(a => ({
    id: a.user.id,
    name: a.user.name,
    studentId: a.user.studentId,
    present: a.present
  }));

  res.json(result);
}
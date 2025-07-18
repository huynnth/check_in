import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const students = await prisma.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        name: true,
        studentId: true,
        email: true
      }
    });
    res.json(students);
  } else {
    res.status(405).end();
  }
}
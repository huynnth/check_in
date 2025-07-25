/*
  Warnings:

  - You are about to drop the column `telegramChatId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "telegramChatId",
ADD COLUMN     "telegramId" TEXT;

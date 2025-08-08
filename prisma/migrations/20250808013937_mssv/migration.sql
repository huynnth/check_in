/*
  Warnings:

  - A unique constraint covering the columns `[mssv]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "mssv" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_mssv_key" ON "public"."User"("mssv");

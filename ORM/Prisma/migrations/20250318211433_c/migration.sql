/*
  Warnings:

  - You are about to drop the column `rolesId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "rolesId",
ALTER COLUMN "updatedAt" DROP NOT NULL;

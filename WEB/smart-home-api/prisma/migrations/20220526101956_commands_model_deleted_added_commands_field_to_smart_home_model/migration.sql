/*
  Warnings:

  - You are about to drop the column `commandsId` on the `SmartHome` table. All the data in the column will be lost.
  - You are about to drop the `Commands` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SmartHome" DROP CONSTRAINT "SmartHome_commandsId_fkey";

-- AlterTable
ALTER TABLE "SmartHome" DROP COLUMN "commandsId",
ADD COLUMN     "commands" TEXT;

-- DropTable
DROP TABLE "Commands";

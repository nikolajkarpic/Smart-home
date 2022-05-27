/*
  Warnings:

  - Added the required column `commandsId` to the `SmartHome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SmartHome" ADD COLUMN     "commandsId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Commands" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commands" TEXT,

    CONSTRAINT "Commands_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SmartHome" ADD CONSTRAINT "SmartHome_commandsId_fkey" FOREIGN KEY ("commandsId") REFERENCES "Commands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

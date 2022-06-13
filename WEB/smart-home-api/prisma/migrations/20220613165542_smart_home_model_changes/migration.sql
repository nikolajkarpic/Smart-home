-- AlterTable
ALTER TABLE "SmartHome" ADD COLUMN     "commandsFront" TEXT DEFAULT E'',
ADD COLUMN     "doorLocked" BOOLEAN DEFAULT true;

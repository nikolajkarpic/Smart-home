-- AlterTable
ALTER TABLE "SmartHome" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "SmartHome" ADD CONSTRAINT "SmartHome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

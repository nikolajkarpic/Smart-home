/*
  Warnings:

  - A unique constraint covering the columns `[pin]` on the table `Occupant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[RFID]` on the table `Occupant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Occupant_pin_key" ON "Occupant"("pin");

-- CreateIndex
CREATE UNIQUE INDEX "Occupant_RFID_key" ON "Occupant"("RFID");

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

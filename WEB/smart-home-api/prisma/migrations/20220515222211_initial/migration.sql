-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lights" BOOLEAN NOT NULL DEFAULT false,
    "currentTemperature" INTEGER,
    "prefferedTemperature" INTEGER DEFAULT 27,
    "mq7" INTEGER,
    "pir" BOOLEAN,
    "smartHomeId" INTEGER,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occupant" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "RFID" TEXT,
    "smartHomeId" INTEGER,

    CONSTRAINT "Occupant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmartHome" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "zipCode" TEXT,
    "currentTemperature" INTEGER NOT NULL,
    "prefferedTemperature" INTEGER NOT NULL DEFAULT 27,

    CONSTRAINT "SmartHome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_smartHomeId_fkey" FOREIGN KEY ("smartHomeId") REFERENCES "SmartHome"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occupant" ADD CONSTRAINT "Occupant_smartHomeId_fkey" FOREIGN KEY ("smartHomeId") REFERENCES "SmartHome"("id") ON DELETE SET NULL ON UPDATE CASCADE;

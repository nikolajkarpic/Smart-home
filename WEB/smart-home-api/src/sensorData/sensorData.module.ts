import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SensorDataController } from "./sensorData.controller";
import { SensorDataService } from "./sensorData.service";

@Module({
    imports: [PrismaModule],
    controllers: [SensorDataController],
    providers: [SensorDataService]
})
export class SensorDataModule { }
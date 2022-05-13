import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SensorData } from "./sensorData.controller";
import { SensorDataService } from "./sensorData.service";

@Module({
    imports: [PrismaModule],
    controllers: [SensorData],
    providers: [SensorDataService]
})
export class SensorDataModule { }
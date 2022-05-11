import { Module } from "@nestjs/common";
import { SensorData } from "./sensorData.controller";
import { SensorDataService } from "./sensorData.service";

@Module({
    controllers: [SensorData],
    providers: [SensorDataService]
})
export class SensorDataModule { }
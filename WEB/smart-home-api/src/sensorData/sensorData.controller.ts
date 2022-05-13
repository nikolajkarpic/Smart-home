import { Controller, Post } from "@nestjs/common";
import { SensorDataService } from "./sensorData.service";
import { SmartHome, Room, Occupant } from "@prisma/client";

@Controller('sensorData')
export class SensorData {
    constructor(private sensorDataService: SensorDataService) { }

    @Post('setData')
    setData() {
        return this.sensorDataService.setData();
    }
}
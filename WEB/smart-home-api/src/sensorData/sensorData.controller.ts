import { Controller, Post, Body, ParseIntPipe } from "@nestjs/common";
import { SensorDataService } from "./sensorData.service";
import { SmartHome, Room, Occupant } from "@prisma/client";
import { SensorDataDto } from "src/dto";

@Controller('sensorData')
export class SensorData {
    constructor(private sensorDataService: SensorDataService) { }

    @Post('setData')
    setData(@Body() dto: SensorDataDto) {
        console.log({ dto });
        return this.sensorDataService.setData(dto);
    }
}
import { Controller, Post, Body, ParseIntPipe } from "@nestjs/common";
import { SensorDataService } from "./sensorData.service";
import { SmartHome, Room, Occupant } from "@prisma/client";
import { SensorDataDto } from "../dto";

@Controller('sensorData')
export class SensorDataController {
    constructor(private sensorDataService: SensorDataService) { }

    @Post('setData')
    setData(@Body() dto: SensorDataDto) {
        console.log({ dto });
        return this.sensorDataService.setData(dto);
    }
}
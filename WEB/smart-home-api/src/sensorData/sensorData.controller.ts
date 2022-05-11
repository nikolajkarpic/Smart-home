import { Controller, Post } from "@nestjs/common";
import { SensorDataService } from "./sensorData.service";

@Controller('sensorData')
export class SensorData {
    constructor(private sensorDataService: SensorDataService) { }

    @Post('setData')
    setData() {
        return this.sensorDataService.setData();
    }
}
import { Body, Controller, Post } from "@nestjs/common";
import { thermostatDto } from "src/dto";
import { ThermostatService } from "./thermostat.service";

@Controller('thermostat')
export class ThermostatController {
    constructor(private thermostatService: ThermostatService) { }

    @Post('setPrefTemp')
    setPrefTemp(@Body() dto: thermostatDto) {
        return this.thermostatService.setPrefTemp(dto);
    }
}
import { Body, Controller, Post } from "@nestjs/common";
import { thermostatDto } from "../dto";
import { ThermostatService } from "./thermostat.service";

@Controller('thermostat')
export class ThermostatController {
    constructor(private thermostatService: ThermostatService) { }

    @Post('setPrefTemp')
    setPrefTemp(@Body() dto: thermostatDto) {
        return this.thermostatService.setPrefTemp(dto);
    }
}
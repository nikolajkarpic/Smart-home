import { thermostatDto } from "src/dto";
import { ThermostatService } from "./thermostat.service";
export declare class ThermostatController {
    private thermostatService;
    constructor(thermostatService: ThermostatService);
    setPrefTemp(dto: thermostatDto): Promise<{
        dto: Number;
    }>;
}

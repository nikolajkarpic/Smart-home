import { SensorDataService } from "./sensorData.service";
import { SensorDataDto } from "src/dto";
export declare class SensorDataController {
    private sensorDataService;
    constructor(sensorDataService: SensorDataService);
    setData(dto: SensorDataDto): void;
}

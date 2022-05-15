import { SensorDataService } from "./sensorData.service";
import { SensorDataDto } from "src/dto";
export declare class SensorData {
    private sensorDataService;
    constructor(sensorDataService: SensorDataService);
    setData(dto: SensorDataDto): void;
}

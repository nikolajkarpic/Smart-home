import { SensorDataService } from "./sensorData.service";
export declare class SensorData {
    private sensorDataService;
    constructor(sensorDataService: SensorDataService);
    setData(): string;
}

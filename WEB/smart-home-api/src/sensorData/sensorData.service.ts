import { Injectable } from "@nestjs/common";

@Injectable()
export class SensorDataService {

    setData() {
        console.log("henlo")
        return "Henlo"
    }
}
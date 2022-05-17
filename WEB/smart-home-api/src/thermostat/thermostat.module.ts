import { Module } from "@nestjs/common";
import { ThermostatController } from "./thermostat.controller";
import { ThermostatService } from "./thermostat.service";

@Module({
    providers: [ThermostatService],
    controllers: [ThermostatController]

})
export class ThermostatModule {

}
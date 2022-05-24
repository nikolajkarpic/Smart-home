import { Module } from "@nestjs/common";
import { OccupantService } from "../occupant/occupant.service";
import { SmartHomeController } from "./smartHome.controller";
import { SmartHomeService } from "./smartHome.service";

@Module({
    providers: [SmartHomeService, OccupantService],
    controllers: [SmartHomeController]
})
export class SmartHomeModule {

}
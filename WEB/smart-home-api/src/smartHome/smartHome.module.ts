import { Module } from "@nestjs/common";
import { RoomService } from "../room/room.service";
import { OccupantService } from "../occupant/occupant.service";
import { SmartHomeController } from "./smartHome.controller";
import { SmartHomeService } from "./smartHome.service";

@Module({
    providers: [SmartHomeService, OccupantService, RoomService],
    controllers: [SmartHomeController]
})
export class SmartHomeModule {

}
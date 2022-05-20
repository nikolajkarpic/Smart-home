import { Module } from "@nestjs/common";
import { OccupantController } from "./occupant.controller";
import { OccupantService } from "./occupant.service";

@Module({
    providers: [OccupantService],
    controllers: [OccupantController]
})
export class OccupantModule {

}
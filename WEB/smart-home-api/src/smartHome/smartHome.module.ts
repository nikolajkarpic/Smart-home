import { Module } from "@nestjs/common";
import { SmartHomeController } from "./smartHome.controller";
import { SmartHomeService } from "./smartHome.service";

@Module({
    providers: [SmartHomeService],
    controllers: [SmartHomeController]
})
export class SmartHomeModule {

}
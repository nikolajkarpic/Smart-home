import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { EditSmartHomeDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";
import { thermostatDto } from "./dto/";
import { SmartHomeService } from "./smartHome.service";

@Controller('smartHome')
@UseGuards(JwtGuard)
export class SmartHomeController {
    constructor(private smartHomeService: SmartHomeService) { }
    @Post('create')
    createSmartHome(@Body() dto: CreateSmartHomeDto, @GetUser('id') userId: number) {
        return this.smartHomeService.createSmartHome(userId, dto);
    }

    @Get('')
    getSmartHomes(@GetUser('id') userId: number) {
        return this.smartHomeService.getSmartHomes(userId);
    }

    @Get(':id')
    getSmartHomeById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) smartHomeId: number) {
        return this.smartHomeService.getSmartHomeById(userId, smartHomeId);
    }

    @Patch(':id')
    editSmartHomeById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) smartHomeId: number, @Body() dto: EditSmartHomeDto) {
        return this.smartHomeService.editSmartHomeById(userId, smartHomeId, dto);
    }

    @Delete(':id')
    deleteSmartHomeById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) smartHomeId: number) {
        return this.smartHomeService.deleteSmartHomeById(userId, smartHomeId);
    }
}
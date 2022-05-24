import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { EditSmartHomeDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";
import { thermostatDto } from "./dto/";
import { SmartHomeService } from "./smartHome.service";
import { OccupantService } from "../occupant/occupant.service";
import { CreateOccupantDto, EditOccupantDto } from "../occupant/dto";

@Controller('smartHome')
@UseGuards(JwtGuard)
export class SmartHomeController {
    constructor(private smartHomeService: SmartHomeService, private occupantService: OccupantService) { }
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

    @Post(':smartHomeId/occupant/create')
    createNewOccupant(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId, @Body() dto: CreateOccupantDto) {
        return this.occupantService.createOccupant(userId, smartHomeId, dto);
    }

    @Get(':smartHomeId/occupants')
    getOccupants(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId: number) {
        return this.occupantService.getOccupants(userId, smartHomeId);
    }

    @Get(":smartHomeId/occupant/:occupantId")
    getOccupantById(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId: number, @Param('occupantId', ParseIntPipe) occupantId: number) {
        return this.occupantService.getOccupantById(userId, smartHomeId, occupantId);
    }

    @Patch(':smartHomeId/occupant/:occupantId')
    editOccupantById(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId: number, @Param('occupantId', ParseIntPipe) occupantId: number, @Body('dto') dto: EditOccupantDto) {
        return this.occupantService.editOccupantById(userId, smartHomeId, occupantId, dto);
    }

    @HttpCode(204)
    @Delete(":smartHomeId/occupant/:occupantId")
    deleteOccupantById(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId: number, @Param('occupantId', ParseIntPipe) occupantId: number) {
        return this.occupantService.deleteOccupantById(userId, smartHomeId, occupantId);
    }
}
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "../auth/decorator";
import { EditOccupantDto } from "./dto";
import { CreateOccupantDto } from "./dto/create-occupant.dto";
import { OccupantService } from "./occupant.service";

@Controller('occupants')
@UseGuards(JwtGuard)
export class OccupantController {
    constructor(private occupantService: OccupantService) { }

    @Post('create')
    createNewOccupant(@GetUser('id') userId: number, @Body() dto: CreateOccupantDto) {
        return this.occupantService.createOccupant(userId, dto);
    }

    @Get()
    getOccupants(@GetUser('id') userId: number, @Body('smartHomeId', ParseIntPipe) smartHomeId: number) {
        return this.occupantService.getOccupants(userId, smartHomeId);
    }
    @Get(":id")
    getOccupantById(@GetUser('id') userId: number, @Body('smartHomeId', ParseIntPipe) smartHomeId: number, @Param('id', ParseIntPipe) occupantId: number) {
        return this.occupantService.getOccupantById(userId, smartHomeId, occupantId);
    }

    @Patch(':id')
    editOccupantById(@GetUser('id') userId: number, @Body('smartHomeId', ParseIntPipe) smartHomeId: number, @Param('id', ParseIntPipe) occupantId: number, @Body('dto') dto: EditOccupantDto) {
        return this.occupantService.editOccupantById(userId, smartHomeId, occupantId, dto);
    }

    @Delete(":id")
    deleteOccupantById(@GetUser('id') userId: number, @Body('smartHomeId', ParseIntPipe) smartHomeId: number, @Param('id', ParseIntPipe) occupantId: number) {
        return this.occupantService.deleteOccupantById(userId, smartHomeId, occupantId);
    }
}
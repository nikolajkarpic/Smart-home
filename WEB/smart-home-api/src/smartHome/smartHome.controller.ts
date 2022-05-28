import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { DoorCommnad, EditSmartHomeDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";
import { thermostatDto } from "./dto/";
import { SmartHomeService } from "./smartHome.service";
import { OccupantService } from "../occupant/occupant.service";
import { CreateOccupantDto, EditOccupantDto } from "../occupant/dto";
import { RoomService } from "../room/room.service";
import { CreateRoomDto } from "src/room/dto/create-room.dto";
import { EditRoomDto } from "src/room/dto";
import { DoorAccessDto } from "src/occupant/dto/doorAccess-occupant.dto";


@Controller('smartHome')
@UseGuards(JwtGuard)
export class SmartHomeController {
    constructor(private smartHomeService: SmartHomeService, private occupantService: OccupantService, private roomService: RoomService) { }
    @Post('create')
    createSmartHome(@Body() dto: CreateSmartHomeDto, @GetUser('id') userId: number) {
        return this.smartHomeService.createSmartHome(userId, dto);
    }



    @Get('')
    getSmartHomes(@GetUser('id') userId: number) {
        return this.smartHomeService.getSmartHomes(userId);
    }

    @Post(':id/door')
    canOccupantEnter(@GetUser('id') userId: number, @Param('id', ParseIntPipe) smartHomeId: number, @Body() dto: DoorAccessDto) {
        return this.occupantService.allowOccupantToEnter(userId, smartHomeId, dto);
    }

    @Get(':id/commands')
    getCommandsById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) smartHomeId: number) {
        return this.smartHomeService.getCommands(userId, smartHomeId);
    }
    @Get(':id')
    getSmartHomeById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) smartHomeId: number) {
        return this.smartHomeService.getSmartHomeById(userId, smartHomeId);
    }

    @Patch(':id/doorCommand')
    updateDoorCommand(@GetUser('id') userId: number, @Param('id', ParseIntPipe) smartHomeId: number, dto: DoorCommnad) {
        return this.smartHomeService.updateDoorCommand(userId, smartHomeId, dto);
    }

    @Patch(':id')
    editSmartHomeById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) smartHomeId: number, @Body() dto: EditSmartHomeDto) {
        return this.smartHomeService.editSmartHomeById(userId, smartHomeId, dto);
    }
    @HttpCode(204)
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

    @Get(':smartHomeId/rooms')
    getRooms(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId: number) {
        return this.roomService.getRooms(userId, smartHomeId);
    }

    @Post(':smartHomeId/room/create')
    createRoom(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId: number, @Body() dto: CreateRoomDto) {
        return this.roomService.createRoom(userId, smartHomeId, dto);
    }

    @Get(":smartHomeId/room/:roomId")
    getRoomById(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId: number, @Param('roomId', ParseIntPipe) roomId: number) {
        return this.roomService.getOccupantById(userId, smartHomeId, roomId);
    }

    @Patch(":smartHomeId/room/:roomId")
    editRoomById(@GetUser('id') userId: number, @Param('smartHomeId', ParseIntPipe) smartHomeId: number, @Param('roomId', ParseIntPipe) roomId: number, @Body() dto: EditRoomDto) {
        return this.roomService.editRoomById(userId, smartHomeId, roomId, dto);
    }

}
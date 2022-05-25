import { EditSmartHomeDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";
import { SmartHomeService } from "./smartHome.service";
import { OccupantService } from "../occupant/occupant.service";
import { CreateOccupantDto, EditOccupantDto } from "../occupant/dto";
import { RoomService } from "../room/room.service";
import { CreateRoomDto } from "src/room/dto/create-room.dto";
import { EditRoomDto } from "src/room/dto";
export declare class SmartHomeController {
    private smartHomeService;
    private occupantService;
    private roomService;
    constructor(smartHomeService: SmartHomeService, occupantService: OccupantService, roomService: RoomService);
    createSmartHome(dto: CreateSmartHomeDto, userId: number): Promise<import(".prisma/client").SmartHome>;
    getSmartHomes(userId: number): Promise<import(".prisma/client").SmartHome[]>;
    getSmartHomeById(userId: number, smartHomeId: number): Promise<import(".prisma/client").SmartHome>;
    editSmartHomeById(userId: number, smartHomeId: number, dto: EditSmartHomeDto): Promise<import(".prisma/client").SmartHome>;
    deleteSmartHomeById(userId: number, smartHomeId: number): Promise<import(".prisma/client").SmartHome>;
    createNewOccupant(userId: number, smartHomeId: any, dto: CreateOccupantDto): Promise<import(".prisma/client").Occupant>;
    getOccupants(userId: number, smartHomeId: number): Promise<import(".prisma/client").Occupant[]>;
    getOccupantById(userId: number, smartHomeId: number, occupantId: number): Promise<import(".prisma/client").Occupant>;
    editOccupantById(userId: number, smartHomeId: number, occupantId: number, dto: EditOccupantDto): Promise<import(".prisma/client").Occupant>;
    deleteOccupantById(userId: number, smartHomeId: number, occupantId: number): Promise<void>;
    getRooms(userId: number, smartHomeId: number): Promise<import(".prisma/client").Room[]>;
    createRoom(userId: number, smartHomeId: number, dto: CreateRoomDto): Promise<import(".prisma/client").Room>;
    getRoomById(userId: number, smartHomeId: number, roomId: number): Promise<import(".prisma/client").Room>;
    editRoomById(userId: number, smartHomeId: number, roomId: number, dto: EditRoomDto): Promise<import(".prisma/client").Room>;
}

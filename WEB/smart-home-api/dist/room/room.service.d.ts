import { PrismaService } from "../prisma/prisma.service";
import { CreateRoomDto } from "./dto";
import { EditRoomDto } from "./dto";
export declare class RoomService {
    private prisma;
    constructor(prisma: PrismaService);
    getRooms(userId: number, smartHomeId: number): Promise<import(".prisma/client").Room[]>;
    createRoom(userId: number, smarthomeId: number, dto: CreateRoomDto): Promise<import(".prisma/client").Room>;
    getOccupantById(userId: number, smartHomeId: number, roomId: number): Promise<import(".prisma/client").Room>;
    editRoomById(userId: number, smartHomeId: number, roomId: number, dto: EditRoomDto): Promise<import(".prisma/client").Room>;
}

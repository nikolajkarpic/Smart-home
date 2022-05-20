import { PrismaService } from "../prisma/prisma.service";
import { EditOccupantDto } from "./dto";
import { CreateOccupantDto } from "./dto";
export declare class OccupantService {
    private prisma;
    constructor(prisma: PrismaService);
    createOccupant(userId: number, dto: CreateOccupantDto): Promise<void>;
    getOccupants(userId: number, smartHomeId: number): Promise<import(".prisma/client").Occupant[]>;
    getOccupantById(userId: number, smartHomeId: number, occupantId: number): Promise<import(".prisma/client").Occupant>;
    editOccupantById(userId: number, smartHomeId: number, occupantId: number, dto: EditOccupantDto): Promise<import(".prisma/client").Occupant>;
    deleteOccupantById(userId: number, smartHomeId: number, occupantId: number): Promise<void>;
}

import { PrismaService } from "../prisma/prisma.service";
import { EditSmartHomeDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";
export declare class SmartHomeService {
    private prisma;
    constructor(prisma: PrismaService);
    createSmartHome(userId: number, dto: CreateSmartHomeDto): Promise<import(".prisma/client").SmartHome>;
    getSmartHomes(userId: number): Promise<import(".prisma/client").SmartHome[]>;
    getSmartHomeById(userId: number, smartHomeId: number): Promise<import(".prisma/client").SmartHome>;
    editSmartHomeById(userId: number, smartHomeId: number, dto: EditSmartHomeDto): Promise<import(".prisma/client").SmartHome>;
    deleteSmartHomeById(userId: any, smartHomeId: any): Promise<import(".prisma/client").SmartHome>;
}

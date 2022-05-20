import { EditSmartHomeDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";
import { SmartHomeService } from "./smartHome.service";
export declare class SmartHomeController {
    private smartHomeService;
    constructor(smartHomeService: SmartHomeService);
    createSmartHome(dto: CreateSmartHomeDto, userId: number): Promise<import(".prisma/client").SmartHome>;
    getSmartHomes(userId: number): Promise<import(".prisma/client").SmartHome[]>;
    getSmartHomeById(userId: number, smartHomeId: number): Promise<import(".prisma/client").SmartHome>;
    editSmartHomeById(userId: number, smartHomeId: number, dto: EditSmartHomeDto): Promise<import(".prisma/client").SmartHome>;
    deleteSmartHomeById(userId: number, smartHomeId: number): Promise<import(".prisma/client").SmartHome>;
}

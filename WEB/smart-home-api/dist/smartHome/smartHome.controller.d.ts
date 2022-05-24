import { EditSmartHomeDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";
import { SmartHomeService } from "./smartHome.service";
import { OccupantService } from "../occupant/occupant.service";
import { CreateOccupantDto, EditOccupantDto } from "../occupant/dto";
export declare class SmartHomeController {
    private smartHomeService;
    private occupantService;
    constructor(smartHomeService: SmartHomeService, occupantService: OccupantService);
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
}

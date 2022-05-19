import { thermostatDto } from "../dto";
import { PrismaService } from "../prisma/prisma.service";
export declare class ThermostatService {
    private prismaService;
    constructor(prismaService: PrismaService);
    setPrefTemp(dto: thermostatDto): Promise<{
        dto: Number;
    }>;
}

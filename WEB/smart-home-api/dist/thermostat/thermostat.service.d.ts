import { thermostatDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ThermostatService {
    private prismaService;
    constructor(prismaService: PrismaService);
    setPrefTemp(dto: thermostatDto): Promise<{
        dto: Number;
    }>;
}

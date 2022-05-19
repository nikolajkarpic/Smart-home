import { SensorDataDto } from "../dto";
import { PrismaService } from "../prisma/prisma.service";
export declare class SensorDataService {
    private prisma;
    constructor(prisma: PrismaService);
    setData(dto: SensorDataDto): void;
}

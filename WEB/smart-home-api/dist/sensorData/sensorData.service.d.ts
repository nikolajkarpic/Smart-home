import { SensorDataDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class SensorDataService {
    private prisma;
    constructor(prisma: PrismaService);
    setData(dto: SensorDataDto): void;
}

import { PrismaService } from "src/prisma/prisma.service";
export declare class SensorDataService {
    private prisma;
    constructor(prisma: PrismaService);
    setData(): string;
}

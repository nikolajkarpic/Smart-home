import { authDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(dto: authDto): Promise<import(".prisma/client").User>;
    signin(): string;
}

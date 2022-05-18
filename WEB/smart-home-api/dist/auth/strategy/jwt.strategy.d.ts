import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
declare const JwtStragety_base: new (...args: any[]) => Strategy;
export declare class JwtStragety extends JwtStragety_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<import(".prisma/client").User>;
}
export {};

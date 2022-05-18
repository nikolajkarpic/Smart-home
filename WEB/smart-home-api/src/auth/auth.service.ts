import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { authDto } from '../dto/';
import { PrismaService } from "../prisma/prisma.service";
import * as argon from 'argon2'

import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
    async signup(@Body() dto: authDto) {
        const hash = await argon.hash(dto.pass);
        try {

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            })

            delete user.hash
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException("Credential taken")
                }
            }
            throw error;
        }

    }

    async signin(@Body() dto: authDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        })
        if (!user) throw new ForbiddenException("Credentials incorect");

        const pwMatches = await argon.verify(user.hash, dto.pass);
        if (!pwMatches) throw new ForbiddenException("Cretendtials inccoret");
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get("JWT_SECRET");
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });
        return ({
            access_token: token,
        });
    }
}
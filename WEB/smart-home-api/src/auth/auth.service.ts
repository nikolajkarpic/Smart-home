import { Body, Injectable } from "@nestjs/common";
import { authDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async signup(@Body() dto: authDto) {
        const hash = await argon.hash(dto.pass);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            }
        })

        delete user.hash
        return user
    }

    signin() {

        return "signin"
    }
}
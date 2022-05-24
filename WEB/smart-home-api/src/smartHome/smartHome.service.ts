import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EditSmartHomeDto, thermostatDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";


@Injectable()
export class SmartHomeService {
    constructor(private prisma: PrismaService) { }

    async createSmartHome(userId: number, dto: CreateSmartHomeDto) {
        const smartHome = await this.prisma.smartHome.create({
            data: {
                userId: userId,
                ...dto,
            },
        });
        return smartHome;
    }

    async getSmartHomes(userId: number) {
        const smartHomes = await this.prisma.smartHome.findMany({
            where: {
                userId: userId,
            },
        });

        return smartHomes;
    }

    async getSmartHomeById(userId: number, smartHomeId: number) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
                userId: userId,
            }
        })
        return smartHome;
    }

    async editSmartHomeById(userId: number, smartHomeId: number, dto: EditSmartHomeDto) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new ForbiddenException('Access to resource denied')
        };

        return await this.prisma.smartHome.update({
            where: {
                id: smartHomeId,
            },
            data: {
                ...dto
            },
        });
    }


    async deleteSmartHomeById(userId, smartHomeId) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new ForbiddenException('Access to resource denied')
        };

        return this.prisma.smartHome.delete({
            where: {
                id: smartHomeId
            }
        })
    }
}
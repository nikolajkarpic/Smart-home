import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EditOccupantDto } from "./dto";
import { CreateOccupantDto } from "./dto";

@Injectable()
export class OccupantService {
    constructor(private prisma: PrismaService) { }

    async createOccupant(userId: number, dto: CreateOccupantDto) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: dto.smartHomeId,
            },
        });

        if (!smartHome || userId != smartHome.userId) {
            throw new ForbiddenException('Access to resource denied');
        }
        const occupant = await this.prisma.occupant.create({
            data: {
                ...dto
            },
        });
        return;
    };

    async getOccupants(userId: number, smartHomeId: number) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new ForbiddenException('Access to resource denied');
        }

        const occupants = await this.prisma.occupant.findMany({
            where: {
                smartHomeId: smartHomeId
            }
        });
        return occupants;
    }
    async getOccupantById(userId: number, smartHomeId: number, occupantId: number) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });

        const occupant = await this.prisma.occupant.findFirst({
            where: {
                id: occupantId
            }
        });
        if (!smartHome || userId != smartHome.userId || !occupant || smartHomeId != occupant.smartHomeId) {
            throw new ForbiddenException('Access to resource denied');
        }
        return occupant;
    }

    async editOccupantById(userId: number, smartHomeId: number, occupantId: number, dto: EditOccupantDto) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });

        const occupant = await this.prisma.occupant.findFirst({
            where: {
                id: occupantId
            }
        });
        if (!smartHome || userId != smartHome.userId || !occupant || smartHomeId != occupant.smartHomeId) {
            throw new ForbiddenException('Access to resource denied');
        }


        return this.prisma.occupant.update({
            where: {
                id: occupantId,
            },
            data: {
                ...dto
            }
        });
    }
    async deleteOccupantById(userId: number, smartHomeId: number, occupantId: number) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });

        const occupant = await this.prisma.occupant.findFirst({
            where: {
                id: occupantId
            }
        });
        if (!smartHome || userId != smartHome.userId || !occupant || smartHomeId != occupant.smartHomeId) {
            throw new ForbiddenException('Access to resource denied');
        }
        await this.prisma.occupant.delete({
            where: {
                id: occupantId,
            }
        });
    }
}
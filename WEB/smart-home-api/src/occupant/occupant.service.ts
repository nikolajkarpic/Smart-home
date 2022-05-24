import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { readFile } from "fs";
import { PrismaService } from "../prisma/prisma.service";
import { EditOccupantDto } from "./dto";
import { CreateOccupantDto } from "./dto";

@Injectable()
export class OccupantService {
    constructor(private prisma: PrismaService) { }

    async createOccupant(userId: number, smarthomeId: number, dto: CreateOccupantDto) {
        console.log(smarthomeId)
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smarthomeId,
            },
        });
        console.log(smartHome)
        if (!smartHome || userId != smartHome.userId) {
            throw new ForbiddenException('Access to resource denied');
        }
        try {

            const occupant = await this.prisma.occupant.create({
                data: {
                    smartHomeId: smarthomeId,
                    ...dto
                },
            });
            return occupant;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException("Credential taken")
                }
            }
            throw error;
        }

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
        const occupantByRfid = await this.prisma.occupant.findFirst({
            where: {
                RFID: dto.RFID
            }
        });
        const occupantByPin = await this.prisma.occupant.findFirst({
            where: {
                pin: dto.pin
            }
        });

        if (occupantByPin || occupantByRfid) {
            throw new ForbiddenException("Credential taken");
        }

        const updatedOccupant = this.prisma.occupant.update({
            where: {
                id: occupantId,
            },
            data: {
                ...dto
            }
        });
        return updatedOccupant;
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
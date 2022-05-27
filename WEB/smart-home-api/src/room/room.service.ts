import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRoomDto } from "./dto";
import { EditRoomDto } from "./dto";

@Injectable()
export class RoomService {
    constructor(private prisma: PrismaService) { }

    async getRooms(userId: number, smartHomeId: number) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new ForbiddenException('Access to resource denied');
        }

        const rooms = await this.prisma.room.findMany({
            where: {
                smartHomeId: smartHomeId
            }
        });
        return rooms;
    }

    async createRoom(userId: number, smarthomeId: number, dto: CreateRoomDto) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smarthomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new ForbiddenException('Access to resource denied');
        }
        try {

            const room = await this.prisma.room.create({
                data: {
                    smartHomeId: smarthomeId,
                    ...dto
                },
            });
            return room;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { // prisma error code for creditentials useed 
                    throw new ForbiddenException("Credential taken")
                }
            }
            throw error;
        }

    };

    async getOccupantById(userId: number, smartHomeId: number, roomId: number) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });

        const room = await this.prisma.room.findFirst({
            where: {
                id: roomId
            }
        });
        if (!smartHome || userId != smartHome.userId || !room || smartHomeId != room.smartHomeId) {
            throw new ForbiddenException('Access to resource denied');
        }
        return room;
    }

    async editRoomById(userId: number, smartHomeId: number, roomId: number, dto: EditRoomDto) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });

        const room = await this.prisma.room.findFirst({
            where: {
                id: roomId
            }
        });
        if (!smartHome || userId != smartHome.userId || !room || smartHomeId != room.smartHomeId) {
            throw new ForbiddenException('Access to resource denied');
        }
        const roomByName = await this.prisma.room.findFirst({
            where: {
                name: dto.name
            }
        });
        if (roomByName && dto.name) {
            throw new ForbiddenException("Credential taken");
        }

        if (dto.lights != null && dto.lights != room.lights) {
            const previousCommands = smartHome.commands;
            let command = previousCommands + room.name + ":lights:" + String(dto.lights) + " ";
            await this.prisma.smartHome.update({
                where: {
                    id: smartHomeId
                },
                data: {
                    commands: command
                }
            })
        }
        const updatedRoom = this.prisma.room.update({
            where: {
                id: roomId,
            },
            data: {
                ...dto
            }
        });
        return updatedRoom;
    }


}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
let RoomService = class RoomService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRooms(userId, smartHomeId) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        const rooms = await this.prisma.room.findMany({
            where: {
                smartHomeId: smartHomeId
            }
        });
        return rooms;
    }
    async createRoom(userId, smarthomeId, dto) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smarthomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        try {
            const room = await this.prisma.room.create({
                data: Object.assign({ smartHomeId: smarthomeId }, dto),
            });
            return room;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException("Credential taken");
                }
            }
            throw error;
        }
    }
    ;
    async getOccupantById(userId, smartHomeId, roomId) {
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
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        return room;
    }
    async editRoomById(userId, smartHomeId, roomId, dto) {
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
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        const roomByName = await this.prisma.room.findFirst({
            where: {
                name: dto.name
            }
        });
        if (roomByName && dto.name) {
            throw new common_1.ForbiddenException("Credential taken");
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
            });
        }
        const updatedRoom = this.prisma.room.update({
            where: {
                id: roomId,
            },
            data: Object.assign({}, dto)
        });
        return updatedRoom;
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map
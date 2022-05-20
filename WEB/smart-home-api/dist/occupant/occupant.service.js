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
exports.OccupantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OccupantService = class OccupantService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOccupant(userId, dto) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: dto.smartHomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        const occupant = await this.prisma.occupant.create({
            data: Object.assign({}, dto),
        });
        return;
    }
    ;
    async getOccupants(userId, smartHomeId) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        const occupants = await this.prisma.occupant.findMany({
            where: {
                smartHomeId: smartHomeId
            }
        });
        return occupants;
    }
    async getOccupantById(userId, smartHomeId, occupantId) {
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
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        return occupant;
    }
    async editOccupantById(userId, smartHomeId, occupantId, dto) {
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
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        return this.prisma.occupant.update({
            where: {
                id: occupantId,
            },
            data: Object.assign({}, dto)
        });
    }
    async deleteOccupantById(userId, smartHomeId, occupantId) {
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
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        await this.prisma.occupant.delete({
            where: {
                id: occupantId,
            }
        });
    }
};
OccupantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OccupantService);
exports.OccupantService = OccupantService;
//# sourceMappingURL=occupant.service.js.map
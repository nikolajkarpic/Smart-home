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
exports.SmartHomeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SmartHomeService = class SmartHomeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSmartHome(userId, dto) {
        const smartHome = await this.prisma.smartHome.create({
            data: Object.assign({ userId: userId }, dto),
        });
        return smartHome;
    }
    async getSmartHomes(userId) {
        const smartHomes = await this.prisma.smartHome.findMany({
            where: {
                userId: userId,
            },
        });
        return smartHomes;
    }
    async getSmartHomeById(userId, smartHomeId) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
                userId: userId,
            }
        });
        return smartHome;
    }
    async editSmartHomeById(userId, smartHomeId, dto) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId,
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        ;
        let command = smartHome.commands;
        if (dto.prefferedTemperature != null && dto.prefferedTemperature != smartHome.prefferedTemperature) {
            command = command + "home:prefferedTemperature:" + dto.prefferedTemperature + " ";
        }
        return await this.prisma.smartHome.update({
            where: {
                id: smartHomeId,
            },
            data: Object.assign(Object.assign({}, dto), { commands: command }),
        });
    }
    async deleteSmartHomeById(userId, smartHomeId) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new common_1.ForbiddenException('Access to resource denied');
        }
        ;
        return this.prisma.smartHome.delete({
            where: {
                id: smartHomeId
            }
        });
    }
    async getCommands(userId, smartHomeId) {
        const smartHome = await this.prisma.smartHome.findUnique({
            where: {
                id: smartHomeId
            }
        });
        let commands = smartHome.commands.split(" ");
        let interfaceList = [];
        const commandsList = commands.slice(0, -1).forEach((command) => {
            let commandSplitByColon = command.split(":");
            let commandInterface = {
                place: commandSplitByColon[0],
                command: commandSplitByColon[1],
                value: commandSplitByColon[2]
            };
            interfaceList.push(commandInterface);
        });
        return interfaceList;
    }
};
SmartHomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SmartHomeService);
exports.SmartHomeService = SmartHomeService;
//# sourceMappingURL=smartHome.service.js.map
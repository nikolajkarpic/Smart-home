import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DoorCommnad, EditSmartHomeDto, thermostatDto } from "./dto";
import { CreateSmartHomeDto } from "./dto/create-smartHome.dto";
import { CommandInterface } from "./interface/command.interface";


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
        let command = smartHome.commands;
        if (dto.prefferedTemperature != null && dto.prefferedTemperature != smartHome.prefferedTemperature) {
            command = command + "home:prefferedTemperature:" + dto.prefferedTemperature + " "
        }
        return await this.prisma.smartHome.update({
            where: {
                id: smartHomeId,
            },
            data: {
                ...dto,
                commands: command
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

    async getCommands(userId: number, smartHomeId: number) {
        const smartHome = await this.prisma.smartHome.findUnique({
            where: {
                id: smartHomeId
            }
        });
        let commands: Array<string> = smartHome.commands.split(" ");
        let interfaceList: Array<CommandInterface> = [];
        const commandsList = commands.slice(0, -1).forEach((command) => {
            let commandSplitByColon = command.split(":");
            let commandInterface: CommandInterface = {
                place: commandSplitByColon[0],
                command: commandSplitByColon[1],
                value: commandSplitByColon[2]
            }
            interfaceList.push(commandInterface);
        });

        return interfaceList;

    }

    async updateDoorCommand(userId: number, smartHomeId, dto: DoorCommnad) {
        const smartHome = await this.prisma.smartHome.findFirst({
            where: {
                id: smartHomeId
            },
        });
        if (!smartHome || userId != smartHome.userId) {
            throw new ForbiddenException('Access to resource denied')
        };

        const previousCommands = smartHome.commands;
        let command = previousCommands + "home:door:" + dto.command + " ";

        await this.prisma.smartHome.update({
            where: {
                id: smartHomeId
            },
            data: {
                commands: command
            }
        })

    }
}
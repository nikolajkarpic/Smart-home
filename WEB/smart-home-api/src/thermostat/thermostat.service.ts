import { Body, Injectable } from "@nestjs/common";
import { thermostatDto } from "../dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ThermostatService {
    constructor(private prismaService: PrismaService) { }

    async setPrefTemp(@Body() dto: thermostatDto) {
        return { "dto": dto.currentTemp }
    }
}
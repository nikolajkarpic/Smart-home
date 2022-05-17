import { Body, Injectable } from "@nestjs/common";
import { thermostatDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ThermostatService {
    constructor(private prismaService: PrismaService) { }

    async setPrefTemp(@Body() dto: thermostatDto) {
        return { "dto": dto.currentTemp }
    }
}
import { Body, Injectable, Post } from "@nestjs/common";
import { SensorDataDto } from "../dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SensorDataService {
    constructor(private prisma: PrismaService) { }

    @Post('setData')
    setData(dto: SensorDataDto) {
        // return "Henlo"
    }
}
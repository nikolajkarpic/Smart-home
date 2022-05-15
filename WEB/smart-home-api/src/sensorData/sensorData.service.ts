import { Body, Injectable, Post } from "@nestjs/common";
import { SensorDataDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SensorDataService {
    constructor(private prisma: PrismaService) { }

    @Post('setData')
    setData(dto: SensorDataDto) {
        // return "Henlo"
    }
}
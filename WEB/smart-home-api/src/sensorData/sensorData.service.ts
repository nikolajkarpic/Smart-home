import { Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SensorDataService {
    constructor(private prisma: PrismaService) { }

    @Post('setData')
    setData() {
        console.log("henlo")
        return "Henlo"
    }
}
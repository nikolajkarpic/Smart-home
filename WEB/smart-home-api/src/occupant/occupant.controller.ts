import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "../auth/decorator";
import { EditOccupantDto } from "./dto";
import { CreateOccupantDto } from "./dto/create-occupant.dto";
import { OccupantService } from "./occupant.service";

@Controller('occupants')
@UseGuards(JwtGuard)
export class OccupantController {
    constructor(private occupantService: OccupantService) { }





}
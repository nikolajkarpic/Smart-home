import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOccupantDto {
    @IsNotEmpty()
    @IsNumber()
    smartHomeId: number
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    pin: string
    @IsOptional()
    @IsString()
    RFID?: string
}
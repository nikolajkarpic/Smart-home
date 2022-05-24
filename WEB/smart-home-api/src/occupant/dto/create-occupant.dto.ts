import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOccupantDto {
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
import { IsOptional, IsString } from "class-validator";

export class DoorAccessDto {
    @IsOptional()
    @IsString()
    pin?: string
    @IsOptional()
    @IsString()
    RFID?: string
}
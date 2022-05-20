import { IsOptional, IsString } from "class-validator";

export class EditOccupantDto {
    @IsOptional()
    @IsString()
    name?: string
    @IsOptional()
    @IsString()
    pin?: string
    @IsOptional()
    @IsString()
    RFID?: string
}
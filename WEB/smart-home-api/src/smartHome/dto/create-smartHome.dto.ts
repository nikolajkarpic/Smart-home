import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSmartHomeDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    address?: string
    @IsOptional()
    @IsString()
    zipCode?: string

    @IsOptional()
    @IsNumber()
    currentTemperature?: number
}
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class SmartHomeDto {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsOptional()
    @IsString()
    address?: string
    @IsOptional()
    @IsString()
    zipCode?: string
    @IsNotEmpty()
    @IsNumber()
    currentTemperature: number
    @IsNotEmpty()
    @IsNumber()
    prefferedTemperature: number
}
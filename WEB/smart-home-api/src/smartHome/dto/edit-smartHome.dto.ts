import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditSmartHomeDto {
    @IsOptional()
    @IsString()
    name?: string
    @IsOptional()
    @IsString()
    address?: string
    @IsOptional()
    @IsString()
    zipCode?: string

    @IsOptional()
    @IsNumber()
    currentTemperature?: number
    @IsOptional()
    @IsNumber()
    prefferedTemperature?: number
}
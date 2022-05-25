import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class EditRoomDto {
    @IsOptional()
    @IsString()
    name?: string
    @IsOptional()
    @IsBoolean()
    lights?: boolean
    @IsOptional()
    @IsNumber()
    currentTemperature?: number
    @IsOptional()
    @IsNumber()
    prefferedTemperature?: number
    @IsOptional()
    @IsNumber()
    mq7?: number
    @IsOptional()
    @IsBoolean()
    pir?: boolean
}
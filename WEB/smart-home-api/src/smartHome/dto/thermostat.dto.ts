import { IsOptional, IsNumber } from "class-validator"

export class thermostatDto {
    @IsOptional()
    @IsNumber()
    prefferedTemperature?: Number
    @IsOptional()
    @IsNumber()
    currentTemperature?: Number
}
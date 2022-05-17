import { IsNotEmpty, IsNumber } from "class-validator"

export class thermostatDto {
    @IsNotEmpty()
    @IsNumber()
    prefTemp: Number
    @IsNotEmpty()
    @IsNumber()
    currentTemp: Number
}
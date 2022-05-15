import { IsNotEmpty, IsNumber } from "class-validator"

export class SensorDataDto {
    @IsNotEmpty()
    @IsNumber()
    pir: number

    @IsNotEmpty()
    @IsNumber()
    mq7: number
}
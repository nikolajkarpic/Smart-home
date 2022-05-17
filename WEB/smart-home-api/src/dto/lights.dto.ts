import { IsBoolean, IsNotEmpty } from "class-validator"

export class LightsDto {
    @IsNotEmpty()
    @IsBoolean()
    bedRoom: Boolean
    @IsNotEmpty()
    @IsBoolean()
    bedRoom1: Boolean
    @IsNotEmpty()
    @IsBoolean()
    kitchen: Boolean
    @IsNotEmpty()
    @IsBoolean()
    livingRoom: Boolean
}
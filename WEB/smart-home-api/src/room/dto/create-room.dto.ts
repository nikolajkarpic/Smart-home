import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    name: string
    //     @IsNotEmpty()
    //     @IsBoolean()
    //     lights: Boolean
}
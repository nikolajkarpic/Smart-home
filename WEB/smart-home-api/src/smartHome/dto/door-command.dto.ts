import { IsNotEmpty, IsString } from "class-validator";

export class DoorCommnad {
    @IsString()
    @IsNotEmpty()
    command: string
}
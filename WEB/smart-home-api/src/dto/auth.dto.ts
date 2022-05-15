import { IsEmail, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class authDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    pass: string


}
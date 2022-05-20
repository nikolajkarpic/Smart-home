import { IsEmail, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class authDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    pass: string

    // add option for longer sighin for rasp to be able to acces this data for longer periods of time.
}
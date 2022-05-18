import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { authDto } from "src/dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: authDto) {
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: authDto) {
        return this.authService.signin(dto);
    }
}
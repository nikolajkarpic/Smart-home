import { Body, Controller, Post } from "@nestjs/common";
import { authDto } from "src/dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: authDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }
}
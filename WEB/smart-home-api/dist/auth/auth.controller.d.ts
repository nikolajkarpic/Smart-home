import { authDto } from "../dto/";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: authDto): Promise<import(".prisma/client").User>;
    signin(dto: authDto): Promise<{
        access_token: string;
    }>;
}

import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: {
        user: {
            id: string;
            institutionalEmail: string;
            role: string;
        };
    }, userAgent: string, ipAddress: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    refresh(req: {
        user: {
            id: string;
            refreshToken: string;
        };
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: {
        user: {
            id: string;
        };
    }, dto: RefreshTokenDto): Promise<{
        message: string;
    }>;
}

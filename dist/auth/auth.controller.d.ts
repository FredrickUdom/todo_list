import { AuthService } from './auth.service';
import { signupDto } from 'src/dto/signup.dto';
import { loginDto } from 'src/dto/login.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(payload: signupDto): Promise<any>;
    login(payload: loginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

import { AuthService } from './auth.service';
import { signupDto } from 'src/dto/signup.dto';
import { User } from '../todo/entity/user.entity';
import { loginDto } from 'src/dto/login.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(payload: signupDto): Promise<any>;
    login(payload: loginDto, req: Request, res: Response): Promise<void>;
    findUser(): Promise<User[]>;
}

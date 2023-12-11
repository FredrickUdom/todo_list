import { User } from '../todo/entity/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signUp(payload: signupDto): Promise<any>;
    signIn(payload: loginDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<{
        clearCookie: Response<any, Record<string, any>>;
        response: Response<any, Record<string, any>>;
    }>;
    findEmail(email: string): Promise<User>;
    user(headers: any): Promise<any>;
    updateUser(headers: any, updateUser: any): Promise<any>;
    findAllUser(): Promise<User[]>;
}

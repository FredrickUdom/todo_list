import { User } from '../todo/entity/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signUp(payload: signupDto): Promise<User>;
    signIn(payload: loginDto): Promise<{
        token: string;
    }>;
}

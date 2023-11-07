import { AuthService } from './auth.service';
import { signupDto } from 'src/todo/dto/signup.dto';
import { User } from '../todo/entity/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(payload: signupDto): Promise<User>;
}

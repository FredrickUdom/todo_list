import { User } from '../todo/entity/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../todo/dto/signup.dto';
export declare class AuthService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    signup(payload: signupDto): Promise<User>;
}

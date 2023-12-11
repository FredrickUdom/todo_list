import { Strategy } from 'passport-jwt';
import { User } from '../../todo/entity/user.entity';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: {
        email: any;
    }): Promise<User>;
}
export {};

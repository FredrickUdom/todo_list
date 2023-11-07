import { Strategy } from 'passport-jwt';
import { User } from 'src/todo/entity/user.entity';
import { Repository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepo;
    constructor(userRepo: Repository<User>);
    validate(payload: {
        email: any;
    }): Promise<User>;
}
export {};

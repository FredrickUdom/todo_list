import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../todo/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { signupDto } from '../todo/dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo:Repository<User>){}

    async signup(payload:signupDto):Promise<User>{
        const {userName, email, password}= payload;
        const userEmail = await this.userRepo.findOne({where:{email:email}});
        if(userEmail){
            throw new HttpException('sorry email already exist', 400);
        };

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await this.userRepo.save({userName, email, password:hashPassword})
        delete user.password;
        return user;
    }

    
}

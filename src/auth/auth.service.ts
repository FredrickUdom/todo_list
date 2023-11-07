import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../todo/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo:Repository<User>, private jwtService:JwtService){}

    async signUp(payload:signupDto):Promise<User>{
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


    async signIn(payload:loginDto){
        const {email, password}=payload;

        const user = await this.userRepo.findOne({where:{email:email}});
        if(!user){
            throw new HttpException('No email found', 400)
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new HttpException('sorry password not exist', 400)
        }

        const jwtPayload = {id:user.id, userName:user.userName}
        const jwtToken = await this.jwtService.signAsync(jwtPayload);

        return {token: jwtToken};
    }
    
}

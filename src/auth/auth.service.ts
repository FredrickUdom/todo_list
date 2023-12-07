import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../todo/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from 'src/todo/constant/constant';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo:Repository<User>, private jwtService:JwtService){}

    async signUp(payload:signupDto){
        const { email, password, ...rest}= payload;
        const userEmail = await this.userRepo.findOne({where:{email:email}});
        if(userEmail){
            throw new HttpException('sorry email already exist', 400);
        };

        const hashPassword = await bcrypt.hash(password, 10)

        try {
            const user = await this.userRepo.save({email, password:hashPassword, ...rest})
            await this.userRepo.save(user);
           delete user.password;
           return user;
        } catch (err) {
            if(err.code === '22P02'){
                throw new BadRequestException('admin role should be lower case')
            }
            return err
        }

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

    async findEmail(email:string){
        const mail = await this.userRepo.findOneByOrFail({email})
        if(!mail){
            throw new UnauthorizedException()
        }
        return mail;
    }

    ///
    async user(headers:any) :Promise<any>{
        const authorizationHeader = headers.authorization; 
        if (authorizationHeader) {
        const token = authorizationHeader.replace('Bearer ', ''); 
        const secret = process.env.JWT_SECRET;
        try {
          const decoded = this.jwtService.verify(token); 
          let id =decoded["id"];
          let user= await this.userRepo.findOneBy({id});
          
    return {id,name:user.userName,email:user.email,role:user.role};
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
        }else{
            throw new UnauthorizedException('Invalid or missing Bearer token');
        }
    }
    
    /////
    async updateUser(headers:any,updateUser:any):Promise<any>{
        const authorizationHeader = headers.authorization; 
        if (authorizationHeader) {
        const token = authorizationHeader.replace('Bearer ', ''); 
        const secret = process.env.JWT_SECRET;
        try {
          const decoded = this.jwtService.verify(token);
        let id =decoded["id"];
        // let user = await this.userModel.findByIdAndUpdate(id,{$set:{
        //     name:updateUser.name
        // }},{
        //     new:true,
        //     runValidators:true
        // });

        let user = await this.findEmail(id)
        
        return {id,name:user.userName,email:user.email,role:user.role};
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
        }else{
            throw new UnauthorizedException('Invalid or missing Bearer token');
        }
    }
}

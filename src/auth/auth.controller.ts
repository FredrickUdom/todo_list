import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from 'src/dto/signup.dto';
import { User } from '../todo/entity/user.entity';
import { loginDto } from 'src/dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    async registration(@Body()payload:signupDto){
        return await this.authService.signUp(payload)
    }

    @Post('login')
    async login(@Body()payload:loginDto, @Res()res:Response){

        const token = await this.authService.signIn(payload);
        // res.cookie('isAuthenticated', true, {maxAge: 2 * 60 * 60 * 100});
        res.cookie('Authenticated', token, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 24
        });
        return res.send({
            success: true,
            userToken: token
        
        })
        // return await this.authService.signIn(payload);
    }
}

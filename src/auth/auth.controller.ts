import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from 'src/dto/signup.dto';
import { User } from '../todo/entity/user.entity';
import { loginDto } from 'src/dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './guard/roles';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    async registration(@Body()payload:signupDto){
        return await this.authService.signUp(payload)
    }

    @Post('login')
    async login(@Body()payload:loginDto, @Req()req:Request, @Res()res:Response){

        const token = await this.authService.signIn(payload);
        // res.cookie('isAuthenticated', true, {maxAge: 2 * 60 * 60 * 100});

        // return await this.authService.signIn(payload);
    }

    @Get()
    @UseGuards(AuthGuard(),RolesGuard)
    @Roles('admin','vendor')
    async findUser(){
        return await this.authService.findAllUser()
    }
}

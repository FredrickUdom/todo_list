import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from '../dto/signup.dto';
import { loginDto } from '../dto/login.dto';
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

        const token = await this.authService.signIn(payload, req, res);
    }

    @HttpCode(200)
    @Post('logout')
    async logout(@Req()req:Request, @Res()res:Response){
        return await this.authService.logout(req,res)
    }

    @Get()
    @UseGuards(AuthGuard(),RolesGuard)
    @Roles('admin','vendor')
    async findUser(){
        return await this.authService.findAllUser()
    }
}

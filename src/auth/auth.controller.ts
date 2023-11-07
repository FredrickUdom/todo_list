import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from 'src/dto/signup.dto';
import { User } from '../todo/entity/user.entity';
import { loginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    async registration(@Body()payload:signupDto):Promise<User>{
        return await this.authService.signUp(payload)
    }

    @Post('login')
    async login(@Body()payload:loginDto){
        return await this.authService.signIn(payload);
    }
}

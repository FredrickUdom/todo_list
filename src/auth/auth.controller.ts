import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from 'src/todo/dto/signup.dto';
import { User } from '../todo/entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    async registration(@Body()payload:signupDto):Promise<User>{
        return await this.authService.signup(payload)
    }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/todo/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {email}):Promise<User> {
    const {email} = payload;
    const user = await this.authService.findEmail(email);
    if(!user){
        throw new UnauthorizedException('Login first to access this endpoint')
    }
    return user;
  }
}
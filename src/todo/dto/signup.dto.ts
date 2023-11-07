import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, } from "class-validator";

export class signupDto{
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message: 'password must conatain atleast One Uppercase, One number and One special key'})
    password: string;

    
}
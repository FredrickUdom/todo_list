import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, } from "class-validator";
import { UserRole } from "src/todo/enum/role.enum";

export class signupDto{
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: 'sorry you must put in 8 character'})
    @MaxLength(16, {message: 'password should not be more than 16 characters'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message: 'password must contain atleast One Uppercase, One number and One special key'})
    password: string;

    @IsOptional()
    role: UserRole

    
}


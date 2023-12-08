import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TodoStatus } from "../todo/enum/todo.enum";

export class todoDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    status: TodoStatus;

 
}
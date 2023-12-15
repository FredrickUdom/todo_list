import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards, Req, Headers } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import {  todoDto } from '../dto/todo.dto';
import { TodoStatusValidationPipePipe } from '../todo-status-validation-pipe/todo-status-validation-pipe.pipe';
import { TodoStatus } from './enum/todo.enum';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../auth/decorator/user.decorator';
import { User } from './entity/user.entity';
import { Request } from 'express';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/guard/roles';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
    constructor(private readonly todoService:TodoService){}

    @Post()
    @UseGuards(AuthGuard(),RolesGuard)
    @Roles('admin','unknown')
    async createTodo( @Body()payload:todoDto, @UserDecorator()user:User){
        
        return await this.todoService.createTodo(payload, user);
    }


    // @Put(':id')
    // async Update(@Body('status', TodoStatusValidationPipePipe)status:TodoStatus,
    // @Param('id')id:number
    // ){
    //     const update = await this.todoService.updateStatus(id, status);
    //     if(!update){
    //         throw new HttpException('sorry no such satatus found', 404)
    //     }
    // }

    @Delete(':id')
    async deleteTodo(@Param('id')id){
        await this.todoService.deleteTodo(id);
       
        return{
            message: 'deleted successfully'
    }
}

    // @Get()
    // async findALlTodo(@UserDecorator()user:User){
    //    return  await this.todoService.findAll(user)
    // }
    @Get()
    async findAll(@UserDecorator()user:User){
        return await this.todoService.getAllTodo(user)
    }
}
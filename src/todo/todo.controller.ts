import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import {  todoDto } from '../dto/todo.dto';
import { TodoStatusValidationPipePipe } from '../todo-status-validation-pipe/todo-status-validation-pipe.pipe';
import { TodoStatus } from './enum/todo.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
    constructor(private readonly todoService:TodoService){}

    @Post()
    async createTodo(@Body()payload:todoDto):Promise<Todo>{
        return await this.todoService.createTodo(payload);
    }


    @Put(':id')
    async Update(@Body('status', TodoStatusValidationPipePipe)status:TodoStatus,
    @Param('id')id:number
    ){
        const update = await this.todoService.updateStatus(id, status);
        if(!update){
            throw new HttpException('sorry no such satatus found', 404)
        }
    }

    @Delete(':id')
    async deleteTodo(@Param('id')id){
        await this.todoService.deleteTodo(id);
       
        return{
            message: 'deleted successfully'
    }
}

    @Get()
    async findALlTodo(){
        await this.todoService.findAll()
    }
}
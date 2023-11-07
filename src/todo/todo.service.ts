import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';

import { TodoStatus } from './enum/todo.enum';
import { todoDto } from '../dto/todo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private readonly todoRepo: Repository<Todo>){}

    async createTodo(todos:todoDto):Promise<Todo>{
       const todo = new Todo();
       todo.title = todos.title;
       todo.description = todos.description;
       todo.status = TodoStatus.OPEN;

       this.todoRepo.create(todo)
       return await this.todoRepo.save(todo)
    }

    async updateStatus(id: number, status:TodoStatus){
        await this.todoRepo.update({id}, {status})
       return this.todoRepo.findOneBy({id})
        
    }

    async deleteTodo(id: number){
        const findDelete = await this.todoRepo.findOneBy({id})
        if(!findDelete){
            throw new HttpException('no such id to delete', 404)
        }
        await this.todoRepo.delete(id)
    }

    async findAll():Promise<Todo[]>{
       return await this.todoRepo.find()
        
    }
}

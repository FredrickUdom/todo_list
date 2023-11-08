import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';

import { TodoStatus } from './enum/todo.enum';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private readonly todoRepo: Repository<Todo>){}

    async createTodo(todos:todoDto, user:User):Promise<Todo>{
       const todo = new Todo();
       todo.title = todos.title;
       todo.description = todos.description;
       todo.status = TodoStatus.OPEN;
       todo.userId = user.id

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

    async findAll(user:User):Promise<Todo[]>{
    //    return await this.todoRepo.find()
        const query = await this.todoRepo.createQueryBuilder('todo');

        query.where('todo.userId = :userId',{userId:user.id})

        try {
            return await query.getMany()
        } catch (error) {
            console.log(error)
            throw new NotFoundException('No todo found')
        }
        
    }
}

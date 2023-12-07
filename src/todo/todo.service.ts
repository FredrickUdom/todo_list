import { HttpException, Injectable, NotFoundException, Req, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { DataSource, Repository } from 'typeorm';

import { TodoStatus } from './enum/todo.enum';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';
import { log } from 'console';
import { UserDecorator } from 'src/auth/decorator/user.decorator';
// import { Request } from 'express';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private readonly todoRepo: Repository<Todo>
    ){}

    async createTodo(payload:todoDto):Promise<Todo>{

      
            const todo = new Todo();
            todo.title = payload.title;
            todo.description = payload.description;
            todo.status = TodoStatus.OPEN;
            todo.userId = payload.userId;
           

            return await this.todoRepo.save(todo)
        
        

      

      
    //    Object.assign(todo, payload)

   
    // users.id = todo.userId;
    // todo.user = user;
    // Object.assign(todo, users)

    // console.log(todo.userId);

    //    const todo = await this.todoRepo.create({
    //     ...payload,
    //     user: user.id
    //    });

    //    if(!todo){
    //     throw new HttpException('sorry not found', 400)
    //    }

    //    console.log(user.id)

    // const todoPost = await this.todoRepo.create(todo)
       

   

      
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

        query.where(`todo.userId = :userId`,{userId:user.id})
        

        try {
            return await query.getMany()
        } catch (error) {
            console.log(error)
            throw new NotFoundException('No todo found')
        }
        
    }
}

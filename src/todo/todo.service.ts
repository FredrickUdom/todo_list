import { HttpException, HttpStatus, Injectable, NotFoundException, Req, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TodoStatus } from './enum/todo.enum';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';


// import { Request } from 'express';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private readonly todoRepo: Repository<User>,@InjectRepository(User) private readonly userRepo: Repository<User>
    ){}

    async createTodo(payload:todoDto, @Req()userId ){
        
        const users = await this.userRepo.findOneBy({id:userId});
        const todo = new Todo();
        todo.title =payload.title;
        todo.description = payload.description;
        todo.user = users
    }

    
    // async updateStatus(id: number, status:TodoStatus){
    //     await this.todoRepo.update({id}, {status})
    //    return this.todoRepo.findOneBy({id})
        
    // }

    async deleteTodo(id: number){
        const findDelete = await this.todoRepo.findOneBy({id})
        if(!findDelete){
            throw new HttpException('no such id to delete', 404)
        }
        await this.todoRepo.delete(id)
    }

    // async findAll(user:User):Promise<Todo[]>{
    // //    return await this.todoRepo.find({ relations:{}})
    //     const query = await this.todoRepo.createQueryBuilder('todo');

    //     query.where(`todo.userId = :userId`,{userId:user.id})
        

    //     try {
    //         return await query.getMany()
    //     } catch (error) {
    //         console.log(error)
    //         throw new NotFoundException('No todo found')
    //     }
        
    // }

    async getAllTodo(user:User){
        const query = await this.todoRepo.createQueryBuilder('todo');
        query.where(`todo.userId = :userId`, {userId:user.id});

        try {
           await query.getMany();
        } catch (error) {
            throw new NotFoundException('no todo for this user')
        }
    }
}

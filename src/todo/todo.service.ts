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
    constructor(@InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    
    // @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}

    ///

    async createTodo(payload:todoDto, user:User){
        const todo = new Todo();
        todo.userId = user.id;
        Object.assign(todo, payload);
        this.todoRepo.create(todo);
        return await this.todoRepo.save(todo)
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

    async findAll(query?:string){
        const myQuery = this.todoRepo.createQueryBuilder("todo")
        .leftJoinAndSelect('todo.user', "user")
        // .getMany()    
        // check if the query is present or not
        if(!(Object.keys(query).length === 0) && query.constructor === Object){

            const queryKey = Object.keys(query); //get the keys of the query string
            // check if the title is present or not
            if(queryKey.includes('title')){
                myQuery.where('todo.title LIKE :title', {title: `%${query['title']}%`});

            }
            // check if the sort is present we will sort by title field only
            if(queryKey.includes("sort")){
                myQuery.orderBy("todo.title", query["sort"].toUpperCase()) // ASC   DESC
            }
            // check if todo is present, show only selected todo  items
            if(queryKey.includes("todo")){
                myQuery.andWhere("todo.title = :todos", {todos:query["todo"]})
            }
            return await myQuery.getMany()
        }
        else{
            return await myQuery.getMany()
        }

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

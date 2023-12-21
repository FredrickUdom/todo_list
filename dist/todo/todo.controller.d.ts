import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';
import { Request } from 'express';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    createTodo(payload: todoDto, req: Request): Promise<Todo & User>;
    deleteTodo(id: any): Promise<{
        message: string;
    }>;
    findALlTodo(query: any): Promise<User[]>;
    findAll(user: User): Promise<void>;
}

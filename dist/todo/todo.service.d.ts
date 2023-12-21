import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';
export declare class TodoService {
    private readonly todoRepo;
    private readonly userRepo;
    constructor(todoRepo: Repository<User>, userRepo: Repository<User>);
    createTodo(payload: todoDto, user: User): Promise<Todo & User>;
    deleteTodo(id: number): Promise<void>;
    findAll(query?: string): Promise<User[]>;
    getAllTodo(user: User): Promise<void>;
}

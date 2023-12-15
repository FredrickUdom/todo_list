import { Repository } from 'typeorm';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';
export declare class TodoService {
    private readonly todoRepo;
    private readonly userRepo;
    constructor(todoRepo: Repository<User>, userRepo: Repository<User>);
    createTodo(payload: todoDto, userId: any): Promise<void>;
    deleteTodo(id: number): Promise<void>;
    getAllTodo(user: User): Promise<void>;
}

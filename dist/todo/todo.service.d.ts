import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';
export declare class TodoService {
    private readonly todoRepo;
    private readonly userRepo;
    constructor(todoRepo: Repository<User>, userRepo: Repository<User>);
    createTodo(userId: number, payload: todoDto): Promise<Todo>;
    deleteTodo(id: number): Promise<void>;
}

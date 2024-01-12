import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';
export declare class TodoService {
    private readonly todoRepo;
    constructor(todoRepo: Repository<Todo>);
    createTodo(payload: todoDto, user: User): Promise<Todo>;
    deleteTodo(id: number): Promise<void>;
    findAll(query?: string): Promise<Todo[]>;
    getAllTodo(user: User): Promise<void>;
}

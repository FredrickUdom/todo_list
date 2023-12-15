import { TodoService } from './todo.service';
import { todoDto } from '../dto/todo.dto';
import { User } from './entity/user.entity';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    createTodo(payload: todoDto, user: User): Promise<void>;
    deleteTodo(id: any): Promise<{
        message: string;
    }>;
    findAll(user: User): Promise<void>;
}

import { TodoService } from './todo.service';
import { User } from './entity/user.entity';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    createTodo(payload: any): Promise<void>;
    deleteTodo(id: any): Promise<{
        message: string;
    }>;
    findAll(user: User): Promise<void>;
}

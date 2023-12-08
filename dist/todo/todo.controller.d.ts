import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { User } from './entity/user.entity';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    createTodo(payload: any, user: User): Promise<Todo>;
    deleteTodo(id: any): Promise<{
        message: string;
    }>;
}

import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    createTodo(payload: any, req: any): Promise<Todo>;
    deleteTodo(id: any): Promise<{
        message: string;
    }>;
}

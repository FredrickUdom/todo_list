import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { TodoStatus } from './enum/todo.enum';
import { todoDto } from './dto/todo.dto';
export declare class TodoService {
    private readonly todoRepo;
    constructor(todoRepo: Repository<Todo>);
    createTodo(todos: todoDto): Promise<Todo>;
    updateStatus(id: number, status: TodoStatus): Promise<Todo>;
    deleteTodo(id: number): Promise<void>;
    findAll(): Promise<Todo[]>;
}

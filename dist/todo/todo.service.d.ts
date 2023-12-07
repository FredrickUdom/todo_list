import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { TodoStatus } from './enum/todo.enum';
import { User } from './entity/user.entity';
export declare class TodoService {
    private readonly todoRepo;
    constructor(todoRepo: Repository<Todo>);
    createTodo(): Promise<Todo>;
    updateStatus(id: number, status: TodoStatus): Promise<Todo>;
    deleteTodo(id: number): Promise<void>;
    findAll(user: User): Promise<Todo[]>;
}

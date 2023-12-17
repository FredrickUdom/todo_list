import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
export declare class TodoService {
    private readonly todoRepo;
    private readonly userRepo;
    constructor(todoRepo: Repository<User>, userRepo: Repository<User>);
    handleRequest(req: any, next: Function): Promise<void>;
    createTodo(request: {
        id: number;
        userId: number;
        title: string;
        description: string;
    }): Promise<void>;
    deleteTodo(id: number): Promise<void>;
    getAllTodo(user: User): Promise<void>;
}

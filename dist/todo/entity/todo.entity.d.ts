import { TodoStatus } from "../enum/todo.enum";
import { User } from "./user.entity";
export declare class Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
    created_At: Date;
    userId: number;
    user: User;
}

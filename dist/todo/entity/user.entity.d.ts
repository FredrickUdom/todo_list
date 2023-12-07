import { Todo } from "./todo.entity";
import { UserRole } from "../enum/role.enum";
export declare class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    role: UserRole;
    created_At: Date;
    todos: Todo[];
}

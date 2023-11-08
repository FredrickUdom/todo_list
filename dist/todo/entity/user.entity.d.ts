import { Todo } from "./todo.entity";
export declare class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    created_At: Date;
    todo: Todo[];
}

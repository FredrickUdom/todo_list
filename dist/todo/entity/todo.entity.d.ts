import { TodoStatus } from "../enum/todo.enum";
export declare class Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
    created_At: Date;
}

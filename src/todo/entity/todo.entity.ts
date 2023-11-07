import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatus } from "../enum/todo.enum";

@Entity()
export class Todo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        default:TodoStatus.OPEN
    })
    status:TodoStatus;

    @CreateDateColumn()
    created_At: Date;
}
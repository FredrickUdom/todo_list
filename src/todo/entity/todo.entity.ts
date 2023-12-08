import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatus } from "../enum/todo.enum";
import { User } from "./user.entity";

@Entity({name:'Todo'})
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

    @ManyToOne(() => User, (user) => user.todo)
    user: User;

   

    @Column()
    userId:number

}
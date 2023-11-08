import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
    
    @CreateDateColumn()
    created_At: Date;

    @OneToMany(() => Todo, (todo) => todo.user)
    todo:Todo[];

}
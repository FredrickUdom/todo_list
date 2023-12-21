import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo.entity";
import { UserRole } from "../enum/role.enum";

@Entity({name:'User'})
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        type:'enum',
        enum:UserRole,
        default: UserRole.unknown
    })
    role: UserRole;
    
    
    @CreateDateColumn()
    created_At: Date;

    @OneToMany(() => Todo, (todo) => todo.user)
    todo:Todo[];
    
 

}
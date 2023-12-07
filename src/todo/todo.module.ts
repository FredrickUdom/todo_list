import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entity/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Todo, User]),
    AuthModule
  ],

  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}

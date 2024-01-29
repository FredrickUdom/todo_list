import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './todo/constant/constant';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    

    TodoModule,

    DatabaseModule,

    // AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

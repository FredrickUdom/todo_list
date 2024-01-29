import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../todo/constant/constant';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useFactory:(configService:ConfigService)=> ({
              type: 'postgres',
              host: configService.getOrThrow('DB_HOST'),
              port: configService.getOrThrow('DB_PORT'),
              username: configService.getOrThrow('DB_USER'),
              password: configService.getOrThrow('DB_PASSWORD'),
              database: configService.getOrThrow('DB_NAME'),
              entities: entities,
              synchronize: configService.getOrThrow('DB_SYYNCHRONIZE'),
            }),
            inject:[ConfigService]
          }),
    ]
})
export class DatabaseModule {}

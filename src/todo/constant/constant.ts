import { ConfigService } from "@nestjs/config";
import { Todo } from "../entity/todo.entity";
import { User } from "../entity/user.entity";

export const entities={
    Todo,
    User
}

export const jwtConstant={
        useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    
}
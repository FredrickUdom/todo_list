import { ConfigService } from "@nestjs/config";
import { Todo } from "../entity/todo.entity";
import { User } from "../entity/user.entity";
export declare const entities: {
    Todo: typeof Todo;
    User: typeof User;
};
export declare const jwtConstant: {
    useFactory: (configService: ConfigService) => Promise<{
        secret: string;
    }>;
    inject: (typeof ConfigService)[];
};

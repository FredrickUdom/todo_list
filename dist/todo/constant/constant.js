"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstant = exports.entities = void 0;
const config_1 = require("@nestjs/config");
const todo_entity_1 = require("../entity/todo.entity");
const user_entity_1 = require("../entity/user.entity");
exports.entities = {
    Todo: todo_entity_1.Todo,
    User: user_entity_1.User
};
exports.jwtConstant = {
    useFactory: async (configService) => ({
        secret: configService.get('JWT_SECRET'),
    }),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=constant.js.map
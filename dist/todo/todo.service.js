"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_entity_1 = require("./entity/todo.entity");
const typeorm_2 = require("typeorm");
let TodoService = class TodoService {
    constructor(todoRepo) {
        this.todoRepo = todoRepo;
    }
    async createTodo(payload, user) {
        const todo = new todo_entity_1.Todo();
        todo.userId = user.id;
        Object.assign(todo, payload);
        this.todoRepo.create(todo);
        return await this.todoRepo.save(todo);
    }
    async deleteTodo(id) {
        const findDelete = await this.todoRepo.findOneBy({ id });
        if (!findDelete) {
            throw new common_1.HttpException('no such id to delete', 404);
        }
        await this.todoRepo.delete(id);
    }
    async findAll(query) {
        const myQuery = this.todoRepo.createQueryBuilder("todo")
            .leftJoinAndSelect('todo.user', "user");
        if (!(Object.keys(query).length === 0) && query.constructor === Object) {
            const queryKey = Object.keys(query);
            if (queryKey.includes('title')) {
                myQuery.where('todo.title LIKE :title', { title: `%${query['title']}%` });
            }
            if (queryKey.includes("sort")) {
                myQuery.orderBy("todo.title", query["sort"].toUpperCase());
            }
            if (queryKey.includes("todo")) {
                myQuery.andWhere("todo.title = :todos", { todos: query["todo"] });
            }
            return await myQuery.getMany();
        }
        else {
            return await myQuery.getMany();
        }
    }
    async getAllTodo(user) {
        const query = await this.todoRepo.createQueryBuilder('todo');
        query.where(`todo.userId = :userId`, { userId: user.id });
        try {
            await query.getMany();
        }
        catch (error) {
            throw new common_1.NotFoundException('no todo for this user');
        }
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoService);
//# sourceMappingURL=todo.service.js.map
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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const todo_dto_1 = require("./dto/todo.dto");
const todo_status_validation_pipe_pipe_1 = require("../todo-status-validation-pipe/todo-status-validation-pipe.pipe");
const todo_enum_1 = require("./enum/todo.enum");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async createTodo(payload) {
        return await this.todoService.createTodo(payload);
    }
    async Update(status, id) {
        const update = await this.todoService.updateStatus(id, status);
        if (!update) {
            throw new common_1.HttpException('sorry no such satatus found', 404);
        }
    }
    async deleteTodo(id) {
        await this.todoService.deleteTodo(id);
        return {
            message: 'deleted successfully'
        };
    }
    async findALlTodo() {
        await this.todoService.findAll();
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.todoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodo", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)('status', todo_status_validation_pipe_pipe_1.TodoStatusValidationPipePipe)),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "Update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "findALlTodo", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todo'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map
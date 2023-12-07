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
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../auth/decorator/user.decorator");
const role_guard_1 = require("../auth/guard/role.guard");
const roles_1 = require("../auth/guard/roles");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async createTodo(payload, req) {
        return await this.todoService.createTodo(payload, req);
    }
    async deleteTodo(id) {
        await this.todoService.deleteTodo(id);
        return {
            message: 'deleted successfully'
        };
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), role_guard_1.RolesGuard),
    (0, roles_1.Roles)('admin', 'vendor'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todo'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map
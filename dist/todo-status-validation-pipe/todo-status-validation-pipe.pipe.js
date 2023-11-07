"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoStatusValidationPipePipe = void 0;
const common_1 = require("@nestjs/common");
const todo_enum_1 = require("../todo/enum/todo.enum");
let TodoStatusValidationPipePipe = class TodoStatusValidationPipePipe {
    constructor() {
        this.allowedStatus = [todo_enum_1.TodoStatus.OPEN, todo_enum_1.TodoStatus.COMPLETED, todo_enum_1.TodoStatus.WIP];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`${value} is an invalid status.`);
        }
        return value;
    }
    isStatusValid(status) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
};
exports.TodoStatusValidationPipePipe = TodoStatusValidationPipePipe;
exports.TodoStatusValidationPipePipe = TodoStatusValidationPipePipe = __decorate([
    (0, common_1.Injectable)()
], TodoStatusValidationPipePipe);
//# sourceMappingURL=todo-status-validation-pipe.pipe.js.map
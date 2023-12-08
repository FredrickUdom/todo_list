"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenRoleException = void 0;
const common_1 = require("@nestjs/common");
class ForbiddenRoleException extends common_1.ForbiddenException {
    constructor(role) {
        super(`You don't have the required role: ${role}`);
    }
}
exports.ForbiddenRoleException = ForbiddenRoleException;
//# sourceMappingURL=role.exception.js.map
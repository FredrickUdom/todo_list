import { ForbiddenException } from '@nestjs/common';
export declare class ForbiddenRoleException extends ForbiddenException {
    constructor(role: string);
}

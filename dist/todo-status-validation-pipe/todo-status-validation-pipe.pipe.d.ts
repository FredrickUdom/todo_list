import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { TodoStatus } from '../todo/enum/todo.enum';
export declare class TodoStatusValidationPipePipe implements PipeTransform {
    readonly allowedStatus: TodoStatus[];
    transform(value: any, metadata: ArgumentMetadata): any;
    private isStatusValid;
}

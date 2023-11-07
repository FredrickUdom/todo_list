import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TodoStatus } from '../todo/enum/todo.enum';

@Injectable()
export class TodoStatusValidationPipePipe implements PipeTransform {
  readonly allowedStatus = [TodoStatus.OPEN, TodoStatus.COMPLETED, TodoStatus.WIP];

  transform(value: any, metadata: ArgumentMetadata):any {
     value = value.toUpperCase();

     if(!this.isStatusValid(value)){
      throw new BadRequestException(`${value} is an invalid status.`);
     }
     return value;
  }

  private isStatusValid(status:any){
      const index = this.allowedStatus.indexOf(status);
      return index !== -1;
  }
}

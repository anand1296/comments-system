import { Pipe, PipeTransform } from '@angular/core';
import { __Comment } from 'src/app/models/comment.model';

@Pipe({
  name: 'filterRootComments'
})
export class FilterRootCommentsPipeTsPipe implements PipeTransform {

  transform(comments: Array<__Comment>, ...args: unknown[]): Array<__Comment> {
    return comments.filter((comment) => comment.parentId === null);
  }

}

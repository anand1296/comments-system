import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';



@NgModule({
  declarations: [
    CommentsListComponent,
    CommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommentsModule { }

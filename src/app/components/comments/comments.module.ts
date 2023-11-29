import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import {HttpClientModule} from '@angular/common/http'
import { CommentsService } from 'src/app/services/comments.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterRootCommentsPipeTsPipe } from 'src/app/utils/pipes/filter-root-comments.pipe.ts.pipe';
import { DataService } from 'src/app/services/data.service';


@NgModule({
  declarations: [
    CommentsListComponent,
    CommentComponent,
    CommentFormComponent,
    FilterRootCommentsPipeTsPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CommentsService, DataService],
  exports: [CommentsListComponent, CommentFormComponent]
})
export class CommentsModule { }

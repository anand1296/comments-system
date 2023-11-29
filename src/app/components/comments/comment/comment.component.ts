import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { __Comment } from 'src/app/models/comment.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: __Comment;
  @Input() replies!: Array<__Comment>;

  @Output() addComment = new EventEmitter<__Comment>();
  @Output() editComment = new EventEmitter<__Comment>();
  @Output() deleteComment = new EventEmitter<__Comment>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // console.log(this.comment);
    // console.log(this.replies)
  }

  public replyTrackBy(index: number, comment: __Comment): string {
    return comment.id;
  }

  onAction(event: MouseEvent, comment: __Comment) {
    const {target} = event;
    const action = (target as HTMLDivElement).textContent?.toLowerCase() ?? '';
    // console.log(action);
    if(action.length) {
      switch(action) {
        case 'reply' : this.onAddComment(comment); break;
        case 'edit' : this.onEditComment(comment); break;
        case 'delete' : this.onDeleteComment(comment); break;
        default: console.log('invalid action');
      }
    }
  }

  onAddComment(comment: __Comment){
    this.addComment.emit(comment);
  }

  onEditComment(comment: __Comment){
    this.editComment.emit(comment);
  }

  onDeleteComment(comment: __Comment){
    this.deleteComment.emit(comment);
  }

  public getReplies(id: string) {
    return this.dataService.getComments().filter((comment) => comment.parentId === id);
  }

}

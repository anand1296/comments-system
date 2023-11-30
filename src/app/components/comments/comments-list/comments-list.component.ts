import { Component, OnInit } from '@angular/core';
import { __Comment } from 'src/app/models/comment.model';
import { CommentsService } from 'src/app/services/comments.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  public commentsList: Array<__Comment> = [];
  public replyParent: __Comment | null = null;
  public isEdit: boolean = false;


  constructor(private commentsService: CommentsService, private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.commentsService.getComments().subscribe((data) => {
      // console.log(data);
      this.commentsList = data;
      this.dataService.setComments(data);
    })
  }

  public getReplies(id: string) {
    return this.commentsList.filter((comment) => comment.parentId === id);
  }

  public commentTrackBy(index: number, comment: __Comment): string {
    return comment.id;
  }

  onAddComment(comment: __Comment) {
    // console.log(comment);
    this.isEdit = false;
    this.replyParent = comment;
  }

  addComment(comment: __Comment) {
    this.commentsService.addComment(comment).subscribe((data) => {
      // console.log(data);
      this.commentsList = [...this.commentsList, data];
      this.dataService.setComments(this.commentsList);
      setTimeout(() => {
        const element = document.getElementById(comment.id);
        element?.scrollIntoView();
      }, 500)
      
    });
  }

  onEditComment(comment: __Comment) {
    // console.log(comment);
    this.isEdit = true;
    this.replyParent = comment;
  }

  editComment(comment: __Comment) {
    this.commentsService.editComment(comment).subscribe((data) => {
      // console.log(data);
      this.commentsList = this.commentsList.map((item) => {
        if(item.id === data.id) {
          return data;
        }
        else return item;
      });
      this.dataService.setComments(this.commentsList);
    });
  }

  onDeleteComment(comment: __Comment) {
    this.commentsService.deleteComment(comment.id).subscribe((data) => {
      // console.log(data);
      this.commentsList = this.commentsList.filter((item) => item.id !== comment.id);
      this.dataService.setComments(this.commentsList);
    });
  }

}

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, FormControl } from '@angular/forms'
import { __Comment } from 'src/app/models/comment.model';

interface __CommentForm {
  username: FormControl<string>;
  comment: FormControl<string>;
}

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})

export class CommentFormComponent implements OnInit, OnChanges {

  @Input() replyParent: __Comment | null = null;
  @Input() editComment: boolean = false;

  @Output() addComment$ = new EventEmitter<__Comment>();
  @Output() editComment$ = new EventEmitter<__Comment>();


  public commentForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group<__CommentForm>({
      username: this.formBuilder.control('', [Validators.required]),
      comment: this.formBuilder.control('', [Validators.required, Validators.maxLength(100)])
    })
  }

  ngOnChanges(): void {
    // console.log(this.replyParent, this.editComment);
    if (this.replyParent && this.editComment) {
      this.commentForm.patchValue({
        username: this.replyParent.user,
        comment: this.replyParent.text
      })
    }
    else {
      this.commentForm.reset();
    }
  }

  saveComment() {
    const newComment: __Comment = {
      id: this.editComment && this.replyParent ? this.replyParent.id : new Date().getTime().toString(),
      text: this.commentForm.get('comment')?.value,
      user: this.commentForm.get('username')?.value,
      parentId: this.replyParent ? this.replyParent.id : null,
      timestamp: new Date()
    }
    // console.log(newComment);
    if (this.editComment) {
      this.editComment$.emit(newComment);
    }
    else {//new comment or reply
      this.addComment$.emit(newComment);
    }
    this.cancelEditOrReply();

  }

  cancelEditOrReply(): void {
    this.replyParent = null;
    this.editComment = false;
    this.commentForm.reset();
  }

}

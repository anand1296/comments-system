import { Injectable } from '@angular/core';
import { __Comment } from '../models/comment.model';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

  private comments: Array<__Comment> = [];

  constructor() { }

  setComments(comments: Array<__Comment>) {
    this.comments = comments
  }

  getComments(): Array<__Comment> {
    return this.comments;
  }
}

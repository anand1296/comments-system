import { Injectable } from '@angular/core';
import { __Comment } from '../models/comment.model';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommentsService {

  private BASE_URL: string = environment.COMMENTS_API_BASE_URL;
  headers = {
    'Content-Type': 'application/json'
  }

  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<Array<__Comment>> {
    return this.httpClient.get<Array<__Comment>>(
      this.BASE_URL
    );
  }

  addComment(comment: __Comment): Observable<__Comment> {
    return this.httpClient.post<__Comment>(
      this.BASE_URL, comment, {headers: this.headers}
    );
  }

  editComment(comment: __Comment): Observable<__Comment> {
    return this.httpClient.patch<__Comment>(
      `${this.BASE_URL}/${comment.id}`, {text: comment.text, timestamp: comment.timestamp}, {headers: this.headers}
    );
  }

  deleteComment(id: string): Observable<{}> {
    return this.httpClient.delete(
      `${this.BASE_URL}/${id}`
    );
  }
}

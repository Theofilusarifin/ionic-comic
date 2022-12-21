import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  root = 'https://ubaya.fun/hybrid/160420046/uts_api/';

  // Add Comment Function
  addComment(
    user_email: string,
    comic_id: number,
    comment: string
  ): Observable<any> {
    let body = new HttpParams();
    body = body.set('user_email', user_email);
    body = body.set('comic_id', comic_id);
    body = body.set('comment', comment);

    return this.http.post(this.root + 'addcomment.php', body);
  }

  // Add Reply Function
  addReply(
    replier_email: string,
    comment_id: number,
    comic_id: number,
    comment: string
  ): Observable<any> {
    let body = new HttpParams();
    body = body.set('replier_email', replier_email);
    body = body.set('comment_id', comment_id);
    body = body.set('comic_id', comic_id);
    body = body.set('comment', comment);

    return this.http.post(this.root + 'addreply.php', body);
  }
}

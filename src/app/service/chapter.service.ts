import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  constructor(private http: HttpClient) {}
  root = 'https://ubaya.fun/hybrid/160420046/uts_api/';

  // Detail Chapter Function
  getById(comic_id: number, chapter_id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('comic_id', comic_id);
    body = body.set('chapter_id', chapter_id);

    return this.http.post(this.root + 'detailchapter.php', body);
  }

  // Next Chapter Function
  getNext(comic_id: number, chapter_now: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('comic_id', comic_id);
    body = body.set('chapter_now', chapter_now);

    return this.http.post(this.root + 'nextchapter.php', body);
  }

  // Previous Chapter Function
  getPrev(comic_id: number, chapter_now: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('comic_id', comic_id);
    body = body.set('chapter_now', chapter_now);

    return this.http.post(this.root + 'prevchapter.php', body);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private http: HttpClient) {}
  root = 'https://ubaya.fun/hybrid/160420046/uts_api/';

  // Latest Comic Function
  getLatest(): Observable<any> {
    let body = new HttpParams();
    return this.http.post(this.root + 'latestcomic.php', body);
  }

  // Popular Comic Function
  getPopular(): Observable<any> {
    let body = new HttpParams();
    return this.http.post(this.root + 'popularcomic.php', body);
  }

  // All Comic Function
  getAll(): Observable<any> {
    let body = new HttpParams();
    return this.http.post(this.root + 'comic.php', body);
  }

  // Keyword Comic Function
  getByKeyword(keyword: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('keyword', keyword);

    return this.http.post(this.root + 'searchcomic.php', body);
  }

  // Favorited Comic Function
  getFavorite(email: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('email', email);

    return this.http.post(this.root + 'favorite.php', body);
  }

  // Completed Comic Function
  getComplete(): Observable<any> {
    let body = new HttpParams();

    return this.http.post(this.root + 'completedcomic.php', body);
  }

  // Detail Comic Function
  getById(comicId: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('comicId', comicId);

    return this.http.post(this.root + 'detailcomic.php', body);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  root = 'https://ubaya.fun/hybrid/160420046/uts_api/';

  addUser(username: string, email: string, password: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('email', email);
    body = body.set('password', password);

    return this.http.post(this.root + 'register.php', body);
  }

  checkUser(email: string, password: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);

    return this.http.post(this.root + 'login.php', body);
  }

  // Add Favorite Function
  addFavorite(user_email: string, comic_id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('user_email', user_email);
    body = body.set('comic_id', comic_id);

    return this.http.post(this.root + 'addfavorite.php', body);
  }

  // Delete Favorite Function
  deleteFavorite(user_email: string, comic_id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('user_email', user_email);
    body = body.set('comic_id', comic_id);

    return this.http.post(this.root + 'removefavorite.php', body);
  }

  // Detail Comic Function
  checkFavorite(user_email: string, comicId: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('user_email', user_email);
    body = body.set('comic_id', comicId);

    return this.http.post(this.root + 'checkfavorite.php', body);
  }

  // Add Rating Function
  addRating(
    user_email: string,
    comicId: number,
    star_temp: number
  ): Observable<any> {
    let body = new HttpParams();
    body = body.set('user_email', user_email);
    body = body.set('comic_id', comicId);
    body = body.set('number', star_temp);

    return this.http.post(this.root + 'addrating.php', body);
  }

  // Reset Rating Function
  resetRating(user_email: string, comicId: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('user_email', user_email);
    body = body.set('comic_id', comicId);

    return this.http.post(this.root + 'resetrating.php', body);
  }
}

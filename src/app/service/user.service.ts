import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(username: string, email: string, password: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('email', email);
    body = body.set('password', password);

    return this.http.post(
      'https://ubaya.fun/hybrid/160420046/uts_api/register.php',
      body
    );
  }

  checkUser(email: string, password: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);

    return this.http.post(
      'https://ubaya.fun/hybrid/160420046/uts_api/login.php',
      body
    );
  }
}

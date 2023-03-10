import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}
  root = 'https://ubaya.fun/hybrid/160420046/uts_api/';

  // Completed Comic Function
  getAll(): Observable<any> {
    let body = new HttpParams();

    return this.http.post(this.root + 'genre.php', body);
  }

  // Detail Genre Function
  getById(genreId: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('genreId', genreId);

    return this.http.post(this.root + 'detailgenre.php', body);
  }
}

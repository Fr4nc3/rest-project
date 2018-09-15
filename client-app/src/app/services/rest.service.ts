import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Search } from '../models/Search';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: Http) {}
  private serverApi = 'http://localhost:8080/api';
  // /restaurants/:word/:page/:grade
  public getResults(search: Search): Observable<any> {
    const URI = `${this.serverApi}/restaurants/${search.word}/${search.page}/${search.grade}`;
    return this.http.get(URI).pipe(
      map(res => {
        return res.json();
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {User} from '../data/user';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint = 'http://hello-world.innocv.com/api/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  addUser(data: User): Observable<any> {
    const API_URL = `${this.endpoint}`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  getUsers() {
    return this.http.get(`${this.endpoint}`);
  }

  getUser(id): Observable<any> {
    const API_URL = `${this.endpoint}/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  updateUser(id, data: User): Observable<any> {
    const API_URL = `${this.endpoint}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  deleteUser(id): Observable<any> {
    const API_URL = `${this.endpoint}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  REST_API: string = 'http://localhost:8000/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  addUser(data: any):Observable<any> {
    // console.warn(data);
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError));
  }

  getUsers() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  getUser(id: any):Observable<any> {
    let API_URL = `${this.REST_API}/edit-user/${id}`;
    return this.httpClient.get(API_URL, {headers: this.httpHeaders}).pipe(map((res: any) => {
      return res || {}
    }), catchError(this.handleError))
  }

  updateUser(id: any, data: any):Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put(API_URL, data).pipe(
      catchError(this.handleError)
    )
  }

  deleteUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code : ${error.status} \n Message: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

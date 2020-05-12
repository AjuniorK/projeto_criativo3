import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {Book} from '../model/book';
import {Transaction} from '../model/transaction';

let API_URL = "http://localhost:8080/api/admin/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API_URL + "user-update", JSON.stringify(user),
  {headers: this.headers});
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(API_URL + "user-delete", JSON.stringify(user),
  {headers: this.headers});
  }

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "user-all",
  {headers: this.headers});
  }

  numberOfUsers(): Observable<any> {
    return this.http.get(API_URL + "user-number",
  {headers: this.headers});
  }

  //books
  createBook(book: Book): Observable<any> {
    return this.http.post(API_URL + "book-create", JSON.stringify(book),
  {headers: this.headers});
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put(API_URL + "book-update", JSON.stringify(book),
  {headers: this.headers});
  }

  deleteBook(book: Book): Observable<any> {
    return this.http.post(API_URL + "book-delete", JSON.stringify(book),
  {headers: this.headers});
  }

  findAllBooks(): Observable<any> {
    return this.http.get(API_URL + "book-all",
  {headers: this.headers});
  }

  numberOfBooks(): Observable<any> {
    return this.http.get(API_URL + "book-number",
  {headers: this.headers});
  }

  //transactions
  findAllTransactions(): Observable<any> {
    return this.http.get(API_URL + "transaction-all",
   {headers: this.headers});
  }

  numberOfTransactions(): Observable<any> {
    return this.http.get(API_URL + "transaction-number",
  {headers: this.headers});
  }
}

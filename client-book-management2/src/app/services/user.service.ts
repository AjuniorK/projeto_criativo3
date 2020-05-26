import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {Book} from '../model/book';
import {Transaction} from '../model/transaction';

let API_URL = "http://localhost:8080/api/user/";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
  //   console.log(user.login)
  //   return this.http.get(API_URL + "login", user.login,
  // {headers: {"Content-Type":"application/string; charset=UTF-8"}});
  let params = new HttpParams();
  params = params.set('login', user.login);

    //return this.httpClient.get('dentists/', {params: params});
    return this.http.get(API_URL + "login", {params: params});
  }

  logOut(): Observable<any> {
    return this.http.post(API_URL + "logout", {})
    .pipe(map(response => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }));
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + "registration", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findAllBooks(): Observable<any> {
    console.log(API_URL + "book");
    return this.http.get(API_URL + "book",
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  tradeBook(transaction: Transaction): Observable<any> {
    return this.http.post(API_URL + "trade", JSON.stringify(transaction),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
}

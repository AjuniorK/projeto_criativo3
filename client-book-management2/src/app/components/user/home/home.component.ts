import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";
import {Book} from "../../../model/book";
import {Transaction} from "../../../model/transaction";
// import {MatPaginator, MatTableDataSource, MatSort} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";

import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  bookList: Array<Book>;
  dataSource: MatTableDataSource<Book> = new MatTableDataSource();
  obs: Observable<any>;
  errorMessage: string;
  infoMessage: string;
  currentUser: User;

  constructor(private userService: UserService, public router: Router,
  private cdr: ChangeDetectorRef) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.findAllBooks();
    this.obs = this.dataSource.connect();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if(this.dataSource){
      this.dataSource.disconnect();
    }
  }

  findAllBooks(){
    this.userService.findAllBooks().subscribe(data => {
      this.bookList = data;
      this.dataSource.data = data;
    });
  }

  tradeBook(book: Book){
    if(!this.currentUser){
      this.errorMessage = "Necessário logar para trocar livros.";
      return;
    }
    var transaction = new Transaction();
    transaction.book = book;
    transaction.user = this.currentUser;
    this.userService.tradeBook(transaction).subscribe(data => {
      this.infoMessage = "Completado com sucesso.";
    },err => {
      this.errorMessage = "Erro inesperado.";
    });
  }

  detail(book: Book){
    localStorage.setItem("currentBook", JSON.stringify(book));
    this.router.navigate(['/detail', book.id]);
  }

}

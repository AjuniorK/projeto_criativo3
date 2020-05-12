import { Component, OnInit, ViewChild } from '@angular/core';
import{ AdminService} from '../../../services/admin.service';
import {Book} from '../../../model/book';
// import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";

declare var $: any;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: Array<Book>;
  dataSource: MatTableDataSource<Book> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nome', 'author', 'action'];
  selectedBook: Book = new Book();
  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllBooks();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllBooks(){
    this.adminService.findAllBooks().subscribe(data => {
      this.bookList = data;
      this.dataSource.data = data;
    });
  }

  createNewBookRequest(){
    this.selectedBook = new Book();
    $('#BookModal').modal('show');
  }

  editBookRequest(book: Book){
    this.selectedBook = book;
    $('#BookModal').modal('show');
  }

  saveBook(){
    if(!this.selectedBook.id){
      this.createBook();
    }else{
      this.updateBook();
    }
  }

  createBook(){
    this.adminService.createBook(this.selectedBook).subscribe(data => {
      this.bookList.push(data);
      this.dataSource = new MatTableDataSource(this.bookList);
      this.infoMessage = "Mission is completed";
      $('#BookModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateBook(){
    this.adminService.updateBook(this.selectedBook).subscribe(data => {
      let itemIndex = this.bookList.findIndex(item => item.id == this.selectedBook.id);
      this.bookList[itemIndex] = this.selectedBook;
      this.dataSource = new MatTableDataSource(this.bookList);
      this.infoMessage = "Mission is completed";
      $('#BookModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteBookRequest(book: Book){
    this.selectedBook = book;
    $('#deleteModal').modal('show');
  }

  deleteBook(){
    this.adminService.deleteBook(this.selectedBook).subscribe(data => {
      let itemIndex = this.bookList.findIndex(item => item.id == this.selectedBook.id);
      if(itemIndex !== -1){
        this.bookList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.bookList);
      this.infoMessage = "Mission is completed";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }
}

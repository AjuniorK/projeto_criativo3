import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  bookId: string;
  currentBook: Book;

  constructor(private route: ActivatedRoute) {
    this.currentBook = JSON.parse(localStorage.getItem("currentBook"));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.bookId = params.get('id');
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userCount:any = "";
  bookCount:any = "";
  transactionCount:any = "";

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.numberOfUsers();
    this.numberOfBooks();
    this.numberOfTransactions();
  }

  numberOfUsers(){
    this.adminService.numberOfUsers().subscribe(data => {
      this.userCount = data.response;
    });
  }

  numberOfBooks(){
    this.adminService.numberOfBooks().subscribe(data => {
      this.bookCount = data.response;
    });
  }

  numberOfTransactions(){
    this.adminService.numberOfTransactions().subscribe(data => {
      this.transactionCount = data.response;
    })
  }

}

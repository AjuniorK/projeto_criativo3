import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";
import {Role} from "../../../model/role";
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css']
})
export class UserTemplateComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService, public router: Router) {
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit() {
  }

  logOut(){
    this.userService.logOut().subscribe(data => {
      console.log("data");
      this.router.navigate(['/login']);
    });
  }

  get isAdmin(){
      return this.currentUser && this.currentUser.role === Role.ADMIN;
  }

}

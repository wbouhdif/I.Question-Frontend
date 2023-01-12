import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Account} from "../shared/account.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  accountName: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.accountName = this.userService.getActiveAccount()?.firstName + " " + this.userService.getActiveAccount()?.lastName;
  }

  toHome() {}

  logOut() {
    this.userService.logOut();
  }
}

import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

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

  logOut() {
    this.userService.logOut();
  }

  accountIsAdmin() {
    return this.userService.getActiveAccount()?.type?.name == 'Admin';
  }

  accountIsCaregiver() {
    return this.userService.getActiveAccount()?.type?.name == 'Caregiver'
  }
}

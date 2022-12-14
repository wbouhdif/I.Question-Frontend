import { Component } from '@angular/core';
import {HttpService} from "../services/http.service";
import {LoginCredentials} from "../shared/login-credentials.model";
import {UserService} from "../services/user.service";
import {Account} from "../shared/account.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private httpService: HttpService, private userService: UserService) {}

  statusCode: any;
  password = "";
  email = "";
  logInCalled = false;

  logIn() {
    this.statusCode = undefined;
    this.logInCalled = true;

    if (this.password === "" || this.email === "") {
      return;
    }

    this.postCredentials()

  }

  postCredentials() {
    this.httpService.post("auth/login", new LoginCredentials(this.email, this.password)).subscribe({
      next: (response) => {this.statusCode = response.status, this.setActiveAccount(this.email)},
      error: (error) => {this.statusCode = error.status}
    });
  }

  setActiveAccount(email: string) {
    let account = new Account();

    this.httpService.get("account/email=" + email).subscribe({
      next: (response) => {Object.assign(account, response.body); this.userService.setActiveAccount(account)},
      error: (error) => console.log(error)
    });
  }

  register() {}
  resetPassword() {}
  
}

import { Component } from '@angular/core';
import {HttpService} from "../services/http.service";
import {LoginCredentials} from "../shared/login-credentials.model";
import {UserService} from "../services/user.service";
import {Account} from "../shared/account.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private httpService: HttpService, private userService: UserService, private router: Router) {}

  account = new Account();
  statusCode: any;
  password = "";
  email = "";
  logInCalled = false;

  logIn() {
    this.account = new Account();
    this.statusCode = undefined;
    this.logInCalled = true;

    if (this.password === "" || this.email === "") {
      return;
    }

    this.postCredentials()

  }

  postCredentials() {

    this.httpService.post("auth/login", new LoginCredentials(this.email, this.password)).subscribe({
      next: (response) => {
        this.statusCode = response.status;
        this.checkAuthorised(this.email);
      },
      error: (error) => {this.statusCode = error.status}
    });
  }

  checkAuthorised(email: string) {
    this.httpService.get("account/email=" + email).subscribe({
      next: (response) => {
        Object.assign(this.account, response.body);
        if (this.account.authorised) {
          this.onLoginSuccessful()
        }
      },
      error: (error) => console.log(error)
    });
  }

  onLoginSuccessful() {
    this.userService.setActiveAccount(this.account);
    this.router.navigate(['questionnaires']);
  }

}

import { Component } from '@angular/core';
import {HttpService} from "../services/http.service";
import {LoginCredentials} from "../shared/login-credentials.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private httpService: HttpService) {}

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

    this.httpService.post("auth/login", new LoginCredentials(this.email, this.password)).subscribe({
      next: (response) => {this.statusCode = response.status},
      error: (error) => {this.statusCode = error.status}
      });
  }

  register() {}
  resetPassword() {};
}

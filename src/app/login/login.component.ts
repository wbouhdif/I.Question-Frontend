import { Component } from '@angular/core';
import {HttpService} from "../services/http.service";
import {LoginCredentials} from "../shared/login-credentials.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private httpService: HttpService, private userService: UserService, private router: Router, private toastr: ToastrService) {}

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
      next: (response) => {

        this.userService.setActiveAccount(response.body.account);
        this.userService.setJwtToken(response.body.token);

        this.toastr.success('Succesvol ingelogd.', 'Succes');
        this.router.navigate(['questionnaires']);
      },
      error: (error) => {
        if (error.status == 401) {
          this.toastr.error('Het account waarop u probeert in te loggen is niet geautoriseerd.', 'Error');
        } else if (error.status == 406) {
          this.toastr.error('Deze combinatie van e-mailadres en wachtwoord komt niet voor in het systeem.', 'Error');
        }
      }
    });
  }

}

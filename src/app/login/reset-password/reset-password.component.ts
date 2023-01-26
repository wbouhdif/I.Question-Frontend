import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AlertService } from "../../services/alert.service";
import { Account } from "../../models/account.model";
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  email: string;

  constructor(private toastr: ToastrService, private alertService: AlertService, private httpService: HttpService) {
    this.email = '';
  }

  resetPassword() {
    if(this.emailFieldIsFilled() && this.emailIsValid()){
      this.alertService.fireSuccess("Mocht het emailadres bestaan in ons systeem, dan ontvangt u een email met een nieuw wachtwoord.")
      this.getAccountByEmail(this.email);
    }
  }


  getAccountByEmail(email: string){
    this.httpService.get("account/new_password/" + email).subscribe({
      next: (response) => {
      },
      error: (error) => {
        this.alertService.fireError("Er is iets fout gegaan, probeer het later opnieuw.");
      }
    });
  }


  emailFieldIsFilled(): boolean {
    if(this.email.length === 0) {
      this.toastr.error('Vul een emailadres in.', 'Error');
      return false;
    }
    return true;
  }
  emailIsValid():boolean{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailRegex.test(this.email)){
      return true;
    }
    this.toastr.error('Vul een geldig emailadres in.', 'Error');
    return false;
  }
}

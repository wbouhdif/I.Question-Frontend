import { Component } from '@angular/core';
import {Account} from "../shared/account.model";
import { AccountType } from "../shared/account-type.model";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  valueCheckBox = "";
  map = new Map();


  constructor(private httpService: HttpService) {

  }

  registerAccount(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    if (this.fieldsAreFilled(firstName, lastName, email, password, confirmPassword) && this.passwordsAreEqual(password, confirmPassword) && this.accountTypeIsSelected()) {
      let accountType: AccountType = new AccountType(this.map.get(this.valueCheckBox), this.valueCheckBox);
      let account: Account = new Account(null, email, password, firstName, lastName, false, accountType);

      console.log(account);
      this.httpService.post("account/register", account).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }

      });
    }
  }







  passwordsAreEqual(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }

  accountTypeIsSelected() {
    return this.valueCheckBox !== "";
  }


  fieldsAreFilled(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    return firstName !== "" && lastName !== "" && email !== "" && password !== "" && confirmPassword !== "";
  }


  ngOnInit(): void {
    this.map.set("spine", "d2de260f-097e-436f-85df-02419a41257a");
    this.map.set("caregiver", "a0211c55-911f-4520-b240-da9f670eb976");
  }

}

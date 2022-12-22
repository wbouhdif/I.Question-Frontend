import { Component } from '@angular/core';
import {Account} from "../shared/account.model";
import {HttpService} from "../services/http.service";
import {AccountType} from "../shared/account-type.model";

@Component({
  selector: 'app-authorise-accounts',
  templateUrl: './authorise-accounts.component.html',
  styleUrls: ['./authorise-accounts.component.scss']
})
export class AuthoriseAccountsComponent {

  accounts: Account[] = [];

  constructor(private httpService: HttpService) {}

  assignAccounts() {
    this.httpService.get('account').subscribe({
      next: (response) => {
        for (let account of response.body) {
          if (account.type?.name !== 'Admin'){
            this.accounts.push(account)
          }
        }
      },
      error: (error) => { console.log(error) }
      });
  }



  ngOnInit() {
    this.assignAccounts()
  }

  authorizeAccount(account: Account) {

  }

  deleteAccount(account: Account) {

  }
}

import { Component } from '@angular/core';
import {Account} from "../shared/account.model";
import {HttpService} from "../services/http.service";

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

  changeAuthorisationAccount(account: Account, authorisation: boolean) {
    this.httpService.put('account/' + account.id + '/authorised', authorisation).subscribe({
      next: (response) => {
        let index = this.accounts.indexOf(account);
        this.accounts[index].authorised = !this.accounts[index].authorised;
      },
      error: (error) => { console.log(error) }
    });
  }

  deleteAccount(account: Account) {

  }
}

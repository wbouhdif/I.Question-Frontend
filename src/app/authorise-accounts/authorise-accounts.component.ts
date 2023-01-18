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

  selectedAccount: any;


  constructor(private httpService: HttpService) {}

  assignAccounts() {
    this.accounts = [];
    this.selectedAccount = null;
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
        this.assignAccounts();
      },
      error: (error) => { console.log(error) }
    });
  }

  deleteAccount(account: Account) {
      this.httpService.delete('account/' + account.id).subscribe({
        next: (response) => {
          this.assignAccounts();
        },
      error: (error) => { console.log(error) }
    });
  }


  setSelectedAccount(account: Account) {
    if(this.selectedAccount === account) {
      this.selectedAccount = null;
    }else{
      this.selectedAccount = account;
    }
  }

  checkIfSelectedAccountIsAuthorised() {
    return this.selectedAccount?.authorised;
  }
}

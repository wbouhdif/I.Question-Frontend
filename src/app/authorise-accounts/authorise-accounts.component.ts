import {Component, OnInit} from '@angular/core';
import {Account} from "../shared/account.model";
import {HttpService} from "../services/http.service";
import {ToastrService} from "ngx-toastr";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-authorise-accounts',
  templateUrl: './authorise-accounts.component.html',
  styleUrls: ['./authorise-accounts.component.scss']
})
export class AuthoriseAccountsComponent implements OnInit {

  accounts: Account[] = [];

  selectedAccount: any;

  constructor(private httpService: HttpService, private toastr: ToastrService, private alertService: AlertService) {}

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
      next: () => {
        this.assignAccounts();
        if (authorisation){
          this.toastr.success('Account geautoriseerd.', 'Succes');
        }else{
          this.toastr.success('Account autorisatie ontzegd.', 'Succes');;
        }
      },
      error: () => {
      this.toastr.error('Account autorisatie kon niet aangepast worden.', 'Error');}
    });

    this.httpService.get('account/authorisationEmail/' + (account.email + ","  + authorisation)).subscribe( {
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);}
    })
  }

  deleteAccount(account: Account) {
    this.httpService.delete('account/' + account.id).subscribe({
      next: () => {
        this.assignAccounts();
        this.toastr.success('Account verwijderd', 'Succes');
          },
          error: () => {
            this.toastr.error('Account kon niet verwijderd worden.', 'Error');
          }
        });
      }

  showDeleteAccountWarning(account: Account){
    this.alertService.fireWarning('Je staat op het punt om het account van ' + account.firstName + ' ' + account.lastName + ' te verwijderen. Je kan dit niet ongedaan maken!')
      .then((result) => {
        if(result.isConfirmed){
          this.deleteAccount(account)}
      })}

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

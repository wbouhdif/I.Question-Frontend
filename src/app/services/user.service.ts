import { Injectable } from '@angular/core';
import {Account} from "../shared/account.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private activeAccount: Account | undefined;

  constructor(private router: Router) { }

  setActiveAccount(activeAccount: Account) {
    this.activeAccount = activeAccount;
    sessionStorage.setItem('active-account', JSON.stringify(activeAccount));
  }

  logOut() {
    sessionStorage.removeItem('active-account');
  }

  getActiveAccount() {
    let activeAccount: any = sessionStorage.getItem('active-account');
    if (activeAccount == undefined) {
      this.router.navigate(['login']);
      return;
    }
    activeAccount = JSON.parse(activeAccount);

    this.activeAccount = activeAccount;

    return this.activeAccount;
  }
}

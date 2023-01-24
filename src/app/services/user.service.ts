import { Injectable } from '@angular/core';
import {Account} from "../shared/account.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private activeAccount: Account | undefined;
  private jwtToken: string | undefined;

  constructor(private router: Router, private toastr: ToastrService) { }

  setActiveAccount(activeAccount: Account) {
    this.activeAccount = activeAccount;
    sessionStorage.setItem('active-account', JSON.stringify(activeAccount));
  }

  setJwtToken(jwtToken: string) {
    this.jwtToken = jwtToken;
    sessionStorage.setItem('jwt-token', JSON.stringify(jwtToken))
  }

  logOut() {
    sessionStorage.removeItem('active-account');
    sessionStorage.removeItem('jwt-token');
    this.toastr.success('Succesvol uitgelogd', 'Succes')
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

  getJwtToken() {
    let jwtToken = sessionStorage.getItem('jwt-token');
    if (jwtToken == undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.jwtToken = jwtToken;

    return this.jwtToken;

  }
}

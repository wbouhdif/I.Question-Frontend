import { Injectable } from '@angular/core';
import {Account} from "../shared/account.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private activeAccount: Account | undefined;

  constructor() { }

  setActiveAccount(activeAccount: Account) {
    this.activeAccount = activeAccount;
  }

  getActiveAccount() {
    return this.activeAccount;
  }
}

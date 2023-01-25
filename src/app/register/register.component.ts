import {Component, SimpleChange} from '@angular/core';
import { HttpService} from "../services/http.service";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Account} from "../shared/account.model";
import {AccountType} from "../shared/account-type.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({});

  passwordIsValid = false;
  emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  roles = [
    {name: 'Zorgverlener', value: 'a0211c55-911f-4520-b240-da9f670eb976'},
    {name: 'Spine-medewerker', value: 'd2de260f-097e-436f-85df-02419a41257a'}];


  constructor(private httpService: HttpService, private fb: FormBuilder, private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      role: ['']
    })
  }

  /*  registerAccount(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
        let account: Account = new Account(undefined, email, password, firstName, lastName, false, accountType);

        this.httpService.post("account/register", account).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }

        });
      }*/

  onSubmit() {

  }

  allFieldsFilled(): boolean {
    for(let key in this.registerForm.value) {
      if (this.registerForm.get(key)?.value == '') {
        this.toastr.error('Vul alle velden in', 'Error');
        return false;
      }
    }
    return true;
  }

  passwordsMatch(): boolean {
    if (this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value) {
      this.toastr.error('Wachtwoorden komen niet overeen', 'Error');
      return false;
    }
    return true;
  }

  emailIsValid() {
    if(!this.emailRegex.test(this.registerForm.get('email')?.value)) {
      this.toastr.error('Vul een geldig email adres in', 'Error');
      return false;
    }
    return true;
  }

  passwordValid(event: boolean) {
    this.passwordIsValid = event;
  }

}

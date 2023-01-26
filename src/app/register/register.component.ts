import {Component, OnInit} from '@angular/core';
import { HttpService} from "../services/http.service";
import { FormBuilder, FormGroup} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Account } from "../models/account.model";
import { AccountType } from "../models/account-type.model";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  passwordIsValid = false;
  emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  roles = [
    { name: 'Zorgverlener', value: '' },
    { name: 'Spine-medewerker', value: '' }
  ];

  constructor(private httpService: HttpService, private fb: FormBuilder, private toastr: ToastrService, private alertService: AlertService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      role: ['']
    })
  }

  ngOnInit() {
    this.assignRoleIds();
  }

  onSubmit() {
    if(this.allFieldsFilled() && this.passwordsMatch() && this.emailIsValid()){
      let firstName = this.registerForm.get('firstName')?.value;
      let lastName = this.registerForm.get('lastName')?.value;
      let email = this.registerForm.get('email')?.value;
      let password = this.registerForm.get('password')?.value;
      let accountType: AccountType = new AccountType(this.registerForm.get('role')?.value.value, this.registerForm.get('role')?.value.name);
      let account: Account = new Account(undefined, email, password, firstName, lastName, false, accountType);

        this.httpService.post("account/register", account).subscribe({
          next: (response) => {
            this.alertService.fireSuccess("Uw account is aangemaakt. Uw account moet nog worden goedgekeurd door een beheerder. U ontvangt een email wanneer uw account is goedgekeurd.")
              .then(() => {
                this.router.navigate(['/login']);
              });
          },
          error: (error) => {
            this.toastr.error('Er is iets fout gegaan, probeer het later opnieuw.', 'Error');
            console.log(error);
          }
        });
    }
  }

  allFieldsFilled(): boolean {
    for(let key in this.registerForm.value) {
      if (this.registerForm.get(key)?.value == '') {
        this.toastr.error('Niet alle velden zijn ingevuld.', 'Error');
        return false;
      }
    }
    return true;
  }

  passwordsMatch(): boolean {
    if (this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value) {
      this.toastr.error('Wachtwoorden komen niet overeen.', 'Error');
      return false;
    }
    return true;
  }

  emailIsValid() {
    if(!this.emailRegex.test(this.registerForm.get('email')?.value)) {
      this.toastr.error('Er is geen geldig email adres ingevuld.', 'Error');
      return false;
    }
    return true;
  }

  passwordValid(event: boolean) {
    this.passwordIsValid = event;
  }

  assignRoleIds() {
    this.httpService.get('account_type/name=Caregiver').subscribe({
      next: (response) => this.roles[0].value = response.body.id,
      error: (error) => console.log(error)
    })
    this.httpService.get('account_type/name=Spine').subscribe({
      next: (response) => this.roles[1].value = response.body.id,
      error: (error) => console.log(error)
    })
  }

}

import { Component } from '@angular/core';
import { HttpService} from "../services/http.service";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({});

  roles = [
    {name: 'Zorgverlener', value: 'a0211c55-911f-4520-b240-da9f670eb976'},
    {name: 'Spine-medewerker', value: 'd2de260f-097e-436f-85df-02419a41257a'}];


  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['', Validators.required],
      confirmPassword: [''],
      role: ['']
    })
  }

  registerAccount(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    if (this.fieldsAreFilled(firstName, lastName, email, password, confirmPassword) && this.passwordsAreEqual(password, confirmPassword) && this.accountTypeIsSelected()) {
      let accountType: AccountType = new AccountType(this.map.get(this.valueCheckBox), this.valueCheckBox);
      let account: Account = new Account(undefined, email, password, firstName, lastName, false, accountType);

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

  onSubmit() {

  }


  fieldsAreFilled(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    return firstName !== "" && lastName !== "" && email !== "" && password !== "" && confirmPassword !== "";
  }


  ngOnInit(): void {
    this.map.set("spine", "d2de260f-097e-436f-85df-02419a41257a");
    this.map.set("caregiver", "a0211c55-911f-4520-b240-da9f670eb976");
  }

}

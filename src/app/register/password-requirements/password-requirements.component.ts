import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-password-requirements',
  templateUrl: './password-requirements.component.html',
  styleUrls: ['./password-requirements.component.scss']
})
export class PasswordRequirementsComponent implements OnChanges {
  @Input() public passwordToCheck: string;
  @Output() passwordStrength = new EventEmitter<boolean>();

  bar0: string;
  bar1: string;
  bar2: string;
  msg = '';

  constructor() {
    this.bar0 = '';
    this.bar1 = '';
    this.bar2 = '';
    this.passwordToCheck = '';
    this.msg = '';
  }

  checkStrength(password: string) {
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(password);
    const upperLetters = /[A-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);
    const length = password.length >= 10;

    const flags = [lowerLetters, upperLetters, numbers, symbols, length];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag ? 1 : 0;
    }
    return passedMatches;
  }


  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.resetBarColors();
    const score = this.checkStrength(changes['passwordToCheck'].currentValue);
    this.setBarColors(score);
    console.log(score);
    if(score === 5) {
      this.msg = 'Uw wachtwoord voldoet aan de eisen';
      this.passwordStrength.emit(true);
    }
    else{
      if(score > 0 ){
        this.msg = 'Uw wachtwoord voldoet niet aan de eisen van het wachtwoord'
      }else{
        this.msg = 'Een wachtwoord moet minimaal 10 tekens bevatten en minimaal 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal teken';
      }
      this.passwordStrength.emit(false);
    }
  }


  setBarColors(score: number) {
    if (score === 5) {
      this.bar0 = 'green';
      this.bar1 = 'green';
      this.bar2 = 'green';
    } else if (score >= 3 && score < 5) {
        this.bar0 = 'orange';
        this.bar1 = 'orange';
        this.bar2 = '#DDD';
    } else if (score >= 1 && score < 3) {
        this.bar0 = 'red';
        this.bar1 = '#DDD';
        this.bar2 = '#DDD';
    }
  }

  resetBarColors() {
    this.bar0 = '#DDD';
    this.bar1 = '#DDD';
    this.bar2 = '#DDD';
  }

}

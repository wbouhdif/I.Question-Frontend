import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {AnsweredQuestionnaire} from "../models/answered-questionnaire.model";
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-answered-questionnaires',
  templateUrl: './answered-questionnaires.component.html',
  styleUrls: ['./answered-questionnaires.component.scss']
})
export class AnsweredQuestionnairesComponent implements OnInit {

  answeredQuestionnaires: AnsweredQuestionnaire[] = [];
  selectedQuestionnaire: any;

  constructor(private httpService: HttpService, private userService: UserService, private alertService: AlertService, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.assignAnsweredQuestionnaires();
  }

  assignAnsweredQuestionnaires() {
    this.httpService.get('answered_questionnaire/account=' + this.userService.getActiveAccount()?.id).subscribe({
      next: (response) => { this.answeredQuestionnaires =  response.body; },
      error: (error) => { console.log(error); }
    });
  }

  delete() {
    this.httpService.delete('answered_questionnaire/' + this.selectedQuestionnaire.id).subscribe({
      next: () => {
        this.answeredQuestionnaires.splice(this.answeredQuestionnaires.indexOf(this.selectedQuestionnaire), 1);
        this.selectedQuestionnaire = undefined

        this.toastr.success('Beantwoorde vragenlijst succesvol verwijderd.', 'Succes');
      },
      error: () => this.toastr.error('Beantwoorde vragenlijst kon niet verwijderd worden.', 'Error')
    })
  }

  setSelectedQuestionnaire(answeredQuestionnaire: AnsweredQuestionnaire) {
    this.selectedQuestionnaire === answeredQuestionnaire ? this.selectedQuestionnaire = undefined : this.selectedQuestionnaire = answeredQuestionnaire;
  }

  showDeleteAlert() {
    this.alertService.fireWarning(
      'U staat op het punt om de vragenlijst: '
      + '"' + this.selectedQuestionnaire.questionnaire.name + '", ingevuld door: '
      + '"' + this.selectedQuestionnaire.clientName + '"'
      + ' te verwijderen. U kunt dit niet ongedaan maken!',)
      .then((result) => {
        if(result.isConfirmed){
          this.delete()
        }
      })
  }

  inspect(){
    this.router.navigate(['questionnaire-answers/' + this.selectedQuestionnaire.id])
  }

}

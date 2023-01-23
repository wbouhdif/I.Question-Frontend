import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {AnsweredQuestionnaire} from "../shared/answered-questionnaire.model";
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-answered-questionnaires',
  templateUrl: './answered-questionnaires.component.html',
  styleUrls: ['./answered-questionnaires.component.scss']
})
export class AnsweredQuestionnairesComponent implements OnInit {

  answeredQuestionnaires: AnsweredQuestionnaire[] = [];
  selectedQuestionnaire: any;

  constructor(private httpService: HttpService, private userService: UserService, private alertService: AlertService) {}

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
      next: (response) => { this.assignAnsweredQuestionnaires(); this.selectedQuestionnaire = undefined },
      error: (error) => console.log(error)
    })
  }

  setSelectedQuestionnaire(answeredQuestionnaire: AnsweredQuestionnaire) {
    this.selectedQuestionnaire === answeredQuestionnaire ? this.selectedQuestionnaire = undefined : this.selectedQuestionnaire = answeredQuestionnaire;
  }

  showDeleteAlert() {
    this.alertService.fireWarning(
      'Je staat op het punt om de vragenlijst: '
      + '"' + this.selectedQuestionnaire.questionnaire.name + '", ingevuld door: '
      + '"' + this.selectedQuestionnaire.clientName + '"'
      + ' te verwijderen. Je kan dit niet ongedaan maken!',)
      .then((result) => {
      if(result.isConfirmed){
        this.delete()
      }
    })
  }

}

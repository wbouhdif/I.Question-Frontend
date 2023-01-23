import {Component, OnInit} from '@angular/core';
import {Questionnaire} from "../shared/questionnaire.model";
import {HttpService} from "../services/http.service";
import {AnsweredQuestionnaire} from "../shared/answered-questionnaire.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-answered-questionnaires',
  templateUrl: './answered-questionnaires.component.html',
  styleUrls: ['./answered-questionnaires.component.scss']
})
export class AnsweredQuestionnairesComponent implements OnInit {

  answeredQuestionnaires: AnsweredQuestionnaire[] = [];
  selectedQuestionnaire: any;

  constructor(private httpService: HttpService, private userService: UserService) {}

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

}

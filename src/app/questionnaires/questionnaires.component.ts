import {Component, OnInit} from '@angular/core';
import {Questionnaire} from "../shared/questionnaire.model";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit {

  questionnaires: Questionnaire[] = [];
  selectedQuestionnaire: any;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.assignQuestionnaires()
  }

  assignQuestionnaires() {
    this.httpService.get('questionnaire').subscribe({
      next: (response) => {
        Object.assign(this.questionnaires, response.body);
        this.questionnaires.forEach((questionnaire) => {
          this.setLength(questionnaire);
        })
      },
      error: (error) => { console.log(error) }
      });
  }

  setLength(questionnaire: Questionnaire) {
    this.httpService.get("employed_question/questionnaire=" + questionnaire.id).subscribe({
      next: (response) => {questionnaire.length = response.body.length},
      error: (error) => {console.log(error)}
      })
  }

}

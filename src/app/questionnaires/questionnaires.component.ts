import { Component, OnInit } from '@angular/core';
import { Questionnaire } from "../shared/questionnaire.model";
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit {

  questionnaires: Questionnaire[] = [];
  selectedQuestionnaire: any;

  constructor(private httpService: HttpService, private router: Router, private userService: UserService) {}

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

  createQuestionnaire() {
    this.router.navigate(['edit-questionnaire']);
  }

  editQuestionnaire() {
    console.log(this.selectedQuestionnaire)

    localStorage.setItem('edited-questionnaire', JSON.stringify(this.selectedQuestionnaire));
    this.setEmployedQuestions();
  }

  setEmployedQuestions() {
    this.httpService.get('employed_question/questionnaire=' + this.selectedQuestionnaire.id).subscribe({
      next: (response) => {
        response.body.sort((a: { position: number; }, b: { position: number; }) => (a.position > b.position) ? 1 : -1);
        localStorage.setItem('edited-questionnaire-employed-questions', JSON.stringify(response.body));
        this.router.navigate(['edit-questionnaire']);
        console.log(response.body)
      },
      error: (error) => { console.log(error) }
    })
  }

}

import {AfterViewInit, Component} from '@angular/core';
import {Answer} from "../../models/answer.model";
import {HttpService} from "../../services/http.service";
import {EmployedQuestion} from "../../models/employed-question.model";
import {Option} from "../../models/option.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Questionnaire} from "../../models/questionnaire.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-inspect-anon-data',
  templateUrl: './inspect-anon-data.component.html',
  styleUrls: ['./inspect-anon-data.component.scss']
})
export class InspectAnonDataComponent implements AfterViewInit{
  questionnaire = new Questionnaire(undefined, 'Nieuwe Vragenlijst', this.userService.getActiveAccount());
  employedQuestions: EmployedQuestion[] = [];
  options: Option[] = [];
  answers: [] = [];
  routeId : any;

  constructor(private router: Router,private httpService: HttpService, private route: ActivatedRoute,private userService: UserService) {
  }
  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.routeId = params['id'];
      this.assignEmployedQuestions();
      this.assignAnswers();
      this.setQuestionnaire();
    })
  }
  assignEmployedQuestions(){
    this.httpService.get("employed_question/questionnaire=" + this.routeId).subscribe({
      next: (response) => { this.employedQuestions =  response.body; },
      error: (error) => { console.log(error); }
      }
    )
  }

  setQuestionnaire() {
    this.httpService.get('questionnaire/' + this.routeId).subscribe({
      next: (response) => {
        this.questionnaire = response.body;
        console.log(this.routeId);
      },
      error: () => { this.router.navigate(['questionnaires']) }
    })
  }

  assignAnswers() {
    for (let employedQuestion of this.employedQuestions) {
      // @ts-ignore
      this.answers.push(new Answer(undefined, '', this.answeredQuestionnaire, employedQuestion))
    }
  }
  cancelInspect(){
    this.router.navigate(['questionnaires']);
  }

}

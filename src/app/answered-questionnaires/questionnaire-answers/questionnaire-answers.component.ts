import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";
import {Questionnaire} from "../../models/questionnaire.model";
import {ActivatedRoute} from "@angular/router";
import {AnsweredQuestionnaire} from "../../models/answered-questionnaire.model";
import {Answer} from "../../models/answer.model";

@Component({
  selector: 'app-questionnaire-answers',
  templateUrl: './questionnaire-answers.component.html',
  styleUrls: ['./questionnaire-answers.component.scss']
})
export class QuestionnaireAnswersComponent implements OnInit{

  answeredQuestionnaire: AnsweredQuestionnaire | any;
  routeId: any;
  questionnaireAnswers: any;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeId = params['id'];
      this.setAnsweredQuestionnaire();
    })
  }

  setAnsweredQuestionnaire(){
    this.httpService.get("answered_questionnaire/" + this.routeId).subscribe({
      next: (response) => {
        this.answeredQuestionnaire = response.body;
        this.setAnswers();
      },
      error: (error) => {
         this.router.navigate(["answered-questionnaires"])
      }
    })
  }

  setAnswers(){
    this.httpService.get("answer/answered_questionnaire=" + this.answeredQuestionnaire.id).subscribe({
      next: (response) => {
        response.body.sort((a: Answer, b: Answer) => (Number (a.employedQuestion?.position) > Number(b.employedQuestion?.position)) ? 1 : -1);
        this.questionnaireAnswers = response.body;
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  returnToAnsweredQuestionnaires() {
    this.router.navigate(["answered-questionnaires"]);
  }
}

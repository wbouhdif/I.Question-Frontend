import { Component } from '@angular/core';
import {HttpService} from "../services/http.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-answer-questionnaire',
  templateUrl: './answer-questionnaire.component.html',
  styleUrls: ['./answer-questionnaire.component.scss']
})
export class AnswerQuestionnaireComponent {

  constructor(private httpService: HttpService, private userService: UserService) {

  }
}

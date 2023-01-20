import { Component, OnInit } from '@angular/core';
import { HttpService } from "../services/http.service";
import { UserService } from "../services/user.service";
import { EmployedQuestion } from "../shared/employed-question.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Questionnaire } from "../shared/questionnaire.model";
import { Answer } from "../shared/answer.model";
import { AnsweredQuestionnaire } from "../shared/answered-questionnaire.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-answer-questionnaire',
  templateUrl: './answer-questionnaire.component.html',
  styleUrls: ['./answer-questionnaire.component.scss']
})
export class AnswerQuestionnaireComponent implements OnInit {

  questionnaire: Questionnaire | any;
  answeredQuestionnaire = new AnsweredQuestionnaire(undefined, this.userService.getActiveAccount(), undefined, '');
  employedQuestions: EmployedQuestion[] = [];
  answers: Answer[] = []

  routeId: any;

  constructor(private httpService: HttpService, private userService: UserService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeId = params['id'];
      this.setQuestionnaire();
    })
  }

  setQuestionnaire() {
    this.httpService.get('questionnaire/' + this.routeId).subscribe({
      next: (response) => {
        this.questionnaire = response.body;
        this.answeredQuestionnaire.questionnaire = this.questionnaire;
        this.setEmployedQuestions()
      },
      error: (error) => { this.router.navigate(['questionnaires'])}
    })
  }

  setEmployedQuestions() {
    this.httpService.get('employed_question/questionnaire=' + this.routeId).subscribe({
      next: (response) => {
        response.body.sort((a: { position: number; }, b: { position: number; }) => (a.position > b.position) ? 1 : -1);
        this.employedQuestions = response.body;
        this.setOptions();
        this.setAnswers();
      },
      error: (error) => { console.log(error) }
    })
  }

  setOptions() {
    for (let employedQuestion of this.employedQuestions.filter(employedQuestion => (employedQuestion.question?.type == 'MULTIPLE_CHOICE'))) {
      this.httpService.get('option/question=' + employedQuestion.question?.id).subscribe({
        next: (response) => { employedQuestion.options = (response.body) },
        error: (error) => { console.log(error) }
      })
    }
  }

  setAnswers() {
    for (let employedQuestion of this.employedQuestions) {
      this.answers.push(new Answer(undefined, '', this.answeredQuestionnaire, employedQuestion))
    }
  }

  getAnswerOfEmployedQuestion(employedQuestion: EmployedQuestion): Answer {
    let answer = (<Answer>this.answers.find(answer => answer.employedQuestion == employedQuestion));
    return answer;
  }

  submit() {
    if (!this.mandatoryAnswered() || !this.nameFilled()) {
      return;
    }
    this.postAnsweredQuestionnaire();
  }

  postAnsweredQuestionnaire() {
    this.httpService.post('answered_questionnaire', this.answeredQuestionnaire).subscribe({
      next: (response) => {
        this.postAnswers(new AnsweredQuestionnaire(response.body));
        this.router.navigate(['questionnaires'])
        },
      error: (error) => { console.log(error) }
    })
  }

  postAnswers(answeredQuestionnaire: AnsweredQuestionnaire) {
    for (let answer of this.answers) {
      answer.answeredQuestionnaire = answeredQuestionnaire;
      if (answer.text != '') {
        this.httpService.post('answer', answer).subscribe({
          next: (response) => { console.log(response.body)},
          error: (error) => { console.log(error) }
        })
      }
    }
  }

  mandatoryAnswered() {
    let unansweredQuestions = [];

    for (let answer of this.answers) {
      if (answer.text == '' && answer.employedQuestion?.mandatory) {
        unansweredQuestions.push(answer.employedQuestion.position);
      }
    }

    if (unansweredQuestions.length != 0) {
      this.toastr.error(this.constructUnansweredString(unansweredQuestions), 'Nog niet alle vragen ingevuld')
      return false;
    }
    return true;
  }

  nameFilled() {
    if (this.answeredQuestionnaire.clientName == '') {
      this.toastr.error('Voer uw naam in het naamveld in.', 'Naamveld leeg')
      return false;
    }
    return true;
  }

  constructUnansweredString(unansweredQuestions: any[]) {
    let unansweredQuestionsString = '';

    unansweredQuestionsString += unansweredQuestions.length > 1 ? 'Verplichte vragen ' : 'Verplichte vraag ';
    for (let position of unansweredQuestions) {
      unansweredQuestionsString += position;
      if(unansweredQuestions.indexOf(position) < unansweredQuestions.length - 2) {
        unansweredQuestionsString += ', '
      } else if (unansweredQuestions.indexOf(position) == unansweredQuestions.length - 2){
        unansweredQuestionsString += ' en '
      }
    }
    unansweredQuestionsString += unansweredQuestions.length > 1 ? ' zijn nog niet beantwoord.' : ' is nog niet beantwoord.';
    return unansweredQuestionsString;
  }

}

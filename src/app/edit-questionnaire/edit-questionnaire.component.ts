import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Questionnaire} from "../shared/questionnaire.model";
import { ActivatedRoute, Router } from "@angular/router";
import {HttpService} from "../services/http.service";
import {ToastrService} from "ngx-toastr";
import {EmployedQuestion} from "../shared/employed-question.model";
import {UserService} from "../services/user.service";
import {Question} from "../shared/question.model";

@Component({
  selector: 'app-edit-questionnaire',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.scss']
})
export class EditQuestionnaireComponent implements OnInit {
  questionnaire = new Questionnaire(undefined, 'Nieuwe Vragenlijst', this.userService.getActiveAccount());
  questions: Question[] = [];
  employedQuestions: EmployedQuestion[] = [];

  routeId: any;

  creatingQuestion = false;
  editingName = false;

  selectedQuestion: any;
  selectedEmployedQuestion: any;

  removedEmployedQuestions: string[] = [];

  @ViewChild('questionnaire_name', {static: false}) questionnaireName: any;
  @ViewChild('questionnaire_name_input', {static: false}) questionnaireNameInput: any

  constructor(private router: Router,
              private ngZone: NgZone,
              private httpService: HttpService,
              private toastr: ToastrService,
              private userService: UserService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeId = params['id'];
      this.getSessionStorage();
    })

    this.setQuestions();
  }

  getSessionStorage() {
    let questionnaire: any = sessionStorage.getItem('edited-questionnaire');
    questionnaire = JSON.parse(questionnaire);

    let removedEmployedQuestions: any = sessionStorage.getItem('removed-employed-questions');
    removedEmployedQuestions = JSON.parse(removedEmployedQuestions);

    let employedQuestions: any = sessionStorage.getItem('edited-questionnaire-employed-questions');
    employedQuestions = JSON.parse(employedQuestions);

    console.log(this.routeId === questionnaire?.id)
    if (this.routeId === questionnaire?.id) {
      Object.assign(this.questionnaire, questionnaire);
      Object.assign(this.employedQuestions, employedQuestions);
      Object.assign(this.removedEmployedQuestions, removedEmployedQuestions);
    } else {
      this.clearSessionStorage();
      this.loadQuestionnaire();
    }
  }

  loadQuestionnaire() {
    console.log(this.routeId != undefined);
    if (this.routeId != undefined) {
      this.setQuestionnaire();
    }
  }

  setQuestionnaire() {
    this.httpService.get('questionnaire/' + this.routeId).subscribe({
      next: (response) => {
        this.questionnaire = response.body;
        this.setEmployedQuestions()
      },
      error: (error) => { this.router.navigate(['questionnaires']) }
    })
  }

  setEmployedQuestions() {
    this.httpService.get('employed_question/questionnaire=' + this.routeId).subscribe({
      next: (response) => {
        response.body.sort((a: { position: number; }, b: { position: number; }) => (a.position > b.position) ? 1 : -1);
        this.employedQuestions = response.body;
      },
      error: (error) => { console.log(error) }
    })
  }

  clearSessionStorage() {
    sessionStorage.removeItem('edited-questionnaire');
    sessionStorage.removeItem('edited-questionnaire-employed-questions');
    sessionStorage.removeItem('removed-employed-questions');
  }

  updateSessionStorage() {
    sessionStorage.setItem('edited-questionnaire', JSON.stringify(this.questionnaire));
    sessionStorage.setItem('edited-questionnaire-employed-questions', JSON.stringify(this.employedQuestions))
    sessionStorage.setItem('removed-employed-questions', JSON.stringify(this.removedEmployedQuestions));
  }

  editName() {
    this.questionnaireNameInput.nativeElement.style.width = this.questionnaireName.nativeElement.offsetWidth + 'px';
    this.questionnaireNameInput.nativeElement.focus()

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.questionnaireNameInput.nativeElement.focus()
      }, 0);
    });
    this.editingName = true;
  }

  saveName(questionnaire_name: string) {
    this.editingName = false;
    this.questionnaire.name = questionnaire_name;
    this.updateSessionStorage();
  }

  cancelNameEditing() {
    this.editingName = false;
    this.questionnaireNameInput.nativeElement.value = this.questionnaire.name;
  }

  cancelEdits() {
    this.clearSessionStorage();
    this.router.navigate(['questionnaires']);
  }

  saveEdits() {
    this.postQuestionnaire()
  }

  postQuestionnaire() {
    this.httpService.post('questionnaire', this.questionnaire).subscribe({
      next: (response) => {
        this.router.navigate(['questionnaires']);
        this.cancelEdits();
        this.deleteEmployedQuestions();
        this.postEmployedQuestions(new Questionnaire(response.body));
      },
      error: (error) => {console.log(error); this.router.navigate(['questionnaires'])}
    })
  }

  postEmployedQuestions(questionnaire: Questionnaire) {
    for(let employedQuestion of this.employedQuestions) {
      employedQuestion.position = this.employedQuestions.indexOf(employedQuestion) + 1;

      employedQuestion.questionnaire = questionnaire;
      this.httpService.post('employed_question', employedQuestion).subscribe({
        next: (response) => { console.log(response) },
        error: (error) => { console.log(error) }
      })
    }
  }

  deleteEmployedQuestions() {
    for(let id of this.removedEmployedQuestions) {
      this.httpService.delete('employed_question/' + id).subscribe({
        next: (response) => {console.log(response)},
        error: (error) => {console.log(error)}
      })
    }
  }

  switchMandatory() {
    this.selectedEmployedQuestion.mandatory = !this.selectedEmployedQuestion.mandatory
    this.updateSessionStorage()
  }

  moveUp() {
    this.employedQuestions.splice(this.employedQuestions.indexOf(
      this.selectedEmployedQuestion) + 1,
      0,
      this.employedQuestions.splice(this.employedQuestions.indexOf(this.selectedEmployedQuestion), 1)[0]);
    this.updateSessionStorage()
  }

  moveDown() {
    this.employedQuestions.splice(this.employedQuestions.indexOf(
      this.selectedEmployedQuestion) - 1,
      0,
      this.employedQuestions.splice(this.employedQuestions.indexOf(this.selectedEmployedQuestion), 1)[0]);
    this.updateSessionStorage()
  }

  removeEmployedQuestion() {
    this.employedQuestions.splice(this.employedQuestions.indexOf(this.selectedEmployedQuestion), 1);
    if(this.selectedEmployedQuestion.id != null) {
      this.removedEmployedQuestions.push(this.selectedEmployedQuestion.id)
    }
    this.selectedEmployedQuestion = undefined
    this.updateSessionStorage()
  }

  setQuestions() {
    this.httpService.get('question').subscribe({
      next: (response) => {Object.assign(this.questions, response.body)},
      error: (error) => {console.log(error)}
    })
  }

  addEmployedQuestion() {
    let addedEmployedQuestion = new EmployedQuestion(undefined, this.selectedQuestion, undefined, undefined, false)
    this.employedQuestions.push(addedEmployedQuestion)

    this.updateSessionStorage()
  }

  deleteQuestion() {
    this.httpService.delete('question/' + this.selectedQuestion.id).subscribe({
      next: () => {
        this.questions.splice(this.questions.indexOf(this.selectedQuestion), 1);
      },
      error: (error) => {
        error.status == 500 ? this.toastr.error("Deze vraag wordt nog gebruikt in één of meerdere vragenlijsten.", 'Vraag nog in gebruik!') : console.log(error);
      }
    })
  }

  createQuestion() {
    this.creatingQuestion = true;
  }

}

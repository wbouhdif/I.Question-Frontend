import { Component, OnInit } from '@angular/core';
import { Questionnaire } from "../shared/questionnaire.model";
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import {AlertService} from "../services/alert.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit {

  questionnaires: Questionnaire[] = [];
  selectedQuestionnaire: any;

  constructor(private httpService: HttpService, private router: Router, private userService: UserService, private alertService: AlertService, private toastr: ToastrService) {}

  ngOnInit() {
    this.assignQuestionnaires()
  }

  assignQuestionnaires() {
    this.httpService.get('questionnaire').subscribe({
        next: (response) => {
        this.questionnaires = response.body;
        this.questionnaires.forEach((questionnaire) => {
          this.setLength(questionnaire);
          this.setAnsweredCount(questionnaire);
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

  setAnsweredCount(questionnaire: Questionnaire) {
    this.httpService.get("answered_questionnaire/questionnaire=" + questionnaire.id).subscribe({
      next: (response) => {questionnaire.answeredCount = response.body.length},
      error: (error) => {console.log(error)}
    })
  }

  createQuestionnaire() {
    this.router.navigate(['create-questionnaire']);
  }

  editQuestionnaire() {
    this.router.navigate(['edit-questionnaire', this.selectedQuestionnaire.id])
  }

  deleteQuestionnaire() {
    this.httpService.delete('questionnaire/' + this.selectedQuestionnaire.id).subscribe({
      next: () => {
        this.questionnaires.splice(this.questionnaires.indexOf(this.selectedQuestionnaire), 1);
        this.selectedQuestionnaire = undefined;

        this.toastr.success('Vragenlijst succesvol verwijderd.', 'Succes');
      },
      error: () => this.toastr.error('Vragenlijst kon niet verwijdered worden.','Error')
    })
  }

  showDeleteAlert() {
    this.alertService.fireWarning('U staat op het punt om de vragenlijst: ' + '"' + this.selectedQuestionnaire.name + '"' + ' te verwijderen. U kunt dit niet ongedaan maken!')
      .then((result) => {
      if(result.isConfirmed){
        this.deleteQuestionnaire()
      }
    })
  }

  answerQuestionnaire() {
    this.router.navigate(['answer-questionnaire', this.selectedQuestionnaire.id]);
  }

  setSelectedQuestionnaire(questionnaire: Questionnaire) {
    this.selectedQuestionnaire === questionnaire ? this.selectedQuestionnaire = undefined : this.selectedQuestionnaire = questionnaire;
  }

  accountIsCaregiver() {
    return this.userService.getActiveAccount()?.type?.name == 'Caregiver';
  }
}

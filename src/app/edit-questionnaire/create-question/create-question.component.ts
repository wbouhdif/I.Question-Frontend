import {Component, EventEmitter, Output} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Question} from "../../shared/question.model";
import {Option} from "../../shared/option.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent {

  @Output() onHide = new EventEmitter<boolean>();
  @Output() setQuestionsEvent = new EventEmitter();

  multipleChoice: boolean = true;
  options = [{name: 'Optie A', text: ''}, {name: 'Optie B', text: ''}, {name: 'Optie C', text: ''}, {name: 'Optie D', text: ''}];
  questionText = '';
  saveCalled = false;

  constructor(private httpService: HttpService, private toastr: ToastrService) {}

  onChangeType() {
    this.multipleChoice = !this.multipleChoice;
    for (let option of this.options) {
      option.text = '';
    }
  }

  checkEnoughOptions() {
    let validOptionCount = 0;
    for (let option of this.options) {
      if(option.text != '') {
        validOptionCount++;
      }
    }
    return validOptionCount >= 2;
  }

  postQuestion() {
    this.saveCalled = true;

    if ((!this.multipleChoice || this.checkEnoughOptions()) && this.questionText != '') {
      let question = new Question(undefined, this.multipleChoice ? 'MULTIPLE_CHOICE' : 'OPEN', this.questionText);

      this.httpService.post('question', question).subscribe({
        next: (response) => {
          if (this.multipleChoice) {
            this.postOptions(response.body)
          }
          this.closeWindow();
          this.setQuestionsEvent.emit();

          this.toastr.success('Vraag succesvol aangemaakt.', 'Succes');
        },
        error: () => this.toastr.error('Vraag kon niet aangemaakt worden.', 'Error')
      })
    }
  }

  postOptions(questionId: string) {
    for(let option of this.options) {
      if(option.text != '') {
        this.httpService.post('option', new Option(undefined, option.text, new Question(questionId))).subscribe({
          next: (response) => {console.log(response)},
          error: (error) => {console.log(error)}
        })
      }
    }
  }

  closeWindow() {
    for (let option of this.options) {
      option.text = '';
    }
    this.multipleChoice = true;
    this.saveCalled = false;
    this.questionText = '';
    this.onHide.emit(false)
  }
}

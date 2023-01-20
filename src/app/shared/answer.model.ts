import {AnsweredQuestionnaire} from "./answered-questionnaire.model";
import {EmployedQuestion} from "./employed-question.model";

export class Answer {

  id: string | undefined;
  text: string | undefined;
  answeredQuestionnaire: AnsweredQuestionnaire | undefined;
  employedQuestion: EmployedQuestion | undefined;

  constructor(id?: string | undefined, text?: string, answeredQuestionnaire?: AnsweredQuestionnaire, employedQuestion?: EmployedQuestion) {
    this.id = id;
    this.text = text;
    this.answeredQuestionnaire = answeredQuestionnaire;
    this.employedQuestion = employedQuestion;
  }

  setText(text: string) {
    this.text = text;
  }
}

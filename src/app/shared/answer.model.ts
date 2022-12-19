import {AnsweredQuestionnaire} from "./answered-questionnaire.model";
import {EmployedQuestion} from "./employed-question.model";

export class Answer {

  private id: string | undefined;
  private text: string | undefined;
  private answeredQuestionnaire: AnsweredQuestionnaire | undefined;
  private employedQuestions: EmployedQuestion | undefined;

  constructor(id: string | undefined, text: string, answeredQuestionnaire: AnsweredQuestionnaire, employedQuestions: EmployedQuestion) {
    this.id = id;
    this.text = text;
    this.answeredQuestionnaire = answeredQuestionnaire;
    this.employedQuestions = employedQuestions;
  }
}

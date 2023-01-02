import {Question} from "./question.model";
import {Questionnaire} from "./questionnaire.model";

export class EmployedQuestion {

  id: string | undefined;
  question: Question | undefined;
  questionnaire: Questionnaire | undefined;
  position: number | undefined;
  mandatory: boolean | undefined

  constructor(id?: string | undefined, question?: Question, questionnaire?: Questionnaire, position?: number, mandatory?: boolean) {
    this.id = id;
    this.question = question;
    this.questionnaire = questionnaire;
    this.position = position;
    this.mandatory = mandatory
  }
}

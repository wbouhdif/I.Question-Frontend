import {Question} from "./question.model";
import {Questionnaire} from "./questionnaire.model";
import {jsonIgnore} from "json-ignore";

export class EmployedQuestion {

  id: string | undefined;
  question: Question | undefined;
  questionnaire: Questionnaire | undefined;
  position: number | undefined;
  mandatory: boolean | undefined;

  @jsonIgnore()
  options: any;

  @jsonIgnore()
  answeredAmount: any;

  constructor(id?: string | undefined, question?: Question, questionnaire?: Questionnaire, position?: number, mandatory?: boolean) {
    this.id = id;
    this.question = question;
    this.questionnaire = questionnaire;
    this.position = position;
    this.mandatory = mandatory
  }

  setOptions(options: any) {
    this.options = options;
  }
}

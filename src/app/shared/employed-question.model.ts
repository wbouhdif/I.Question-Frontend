import {Question} from "./question.model";
import {Questionnaire} from "./questionnaire.model";

export class EmployedQuestion {

  private id: string | undefined;
  private question: Question | undefined;
  private questionnaire: Questionnaire | undefined;
  private position: number | undefined;


  constructor(id?: string | undefined, question?: Question, questionnaire?: Questionnaire, position?: number) {
    this.id = id ?? undefined;
    this.question = question ?? undefined;
    this.questionnaire = questionnaire ?? undefined;
    this.position = position ?? undefined;
  }
}
